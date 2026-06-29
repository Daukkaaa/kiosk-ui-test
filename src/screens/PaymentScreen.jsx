import { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { createOrder, createPayment, getPaymentStatus, getOrder, simulatePayment } from '../api';
import { PAYMENT_POLL_INTERVAL } from '../config';
import { t } from '../i18n';

const TIMEOUT_SEC = 300;

export default function PaymentScreen({ lang, cart, total, onSuccess, onError, onCancel }) {
  const [step, setStep] = useState('creating');
  const [qrData, setQrData] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [timeLeft, setTimeLeft] = useState(TIMEOUT_SEC);
  const [simulating, setSimulating] = useState(false);
  const pollRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const firstItem = cart[0];
        const order = await createOrder(firstItem.product_id, firstItem.slot_number);
        if (cancelled) return;
        setOrderNumber(order.order_number);
        const payment = await createPayment(order.id);
        if (cancelled) return;
        setQrData(payment.qr_data);
        setStep('qr');
        pollRef.current = setInterval(async () => {
          try {
            const st = await getPaymentStatus(order.id);
            if (st.status === 'completed') {
              clearInterval(pollRef.current); clearInterval(timerRef.current);
              onSuccess(await getOrder(order.id));
            } else if (st.status === 'failed') {
              clearInterval(pollRef.current); clearInterval(timerRef.current);
              onError('Payment failed');
            }
          } catch {}
        }, PAYMENT_POLL_INTERVAL);
        timerRef.current = setInterval(() => {
          setTimeLeft(p => { if (p <= 1) { clearInterval(pollRef.current); clearInterval(timerRef.current); onError('Timeout'); return 0; } return p - 1; });
        }, 1000);
      } catch (e) {
        if (!cancelled) onError(e.message);
      }
    }
    init();
    return () => { cancelled = true; clearInterval(pollRef.current); clearInterval(timerRef.current); };
  }, [cart, onSuccess, onError]);

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <div className="screen fade-in">
      <div className="payment-layout">
        <div className="panel payment-qr">
          {step === 'creating' ? (
            <div className="loading-state"><div><div className="spinner" /><div>{t(lang, 'creatingOrder')}</div></div></div>
          ) : (
            <div className="qr-card"><QRCodeSVG value={qrData} size={340} level="M" bgColor="#fff" fgColor="#111827" /></div>
          )}
        </div>
        <div className="panel payment-side">
          <button className="back-btn" onClick={onCancel} style={{ marginBottom: 18 }}>←</button>
          <div className="payment-order">Order #{orderNumber || '...'}</div>
          <div className="payment-amount">{total} ₸</div>
          <div className="payment-text">{t(lang, 'scanQR')} <strong>Kaspi.kz</strong></div>
          <div className="payment-timer">⏳ {min}:{sec.toString().padStart(2, '0')}</div>
          <div className="payment-items">
            {cart.map(item => (
              <div className="payment-item" key={item.id}>
                <span>{item.product_name} ×{item.qty}</span>
                <strong>{item.product_price * item.qty} ₸</strong>
              </div>
            ))}
          </div>
          <button
            className="primary-cta"
            disabled={simulating}
            onClick={async () => {
              setSimulating(true);
              try { await simulatePayment(orderNumber); } catch (e) { onError(e.message); }
            }}
            style={{ background: simulating ? '#94a3b8' : '#16a34a', marginTop: 18 }}
          >
            {simulating ? t(lang, 'checking') : t(lang, 'paid')}
          </button>
        </div>
      </div>
    </div>
  );
}
