import { t } from '../i18n';

function CartItem({ item, onAdd, onRemove }) {
  return (
    <div className="cart-row">
      <div className="cart-row__img" style={{ backgroundImage: item.product_image_url ? `url(${item.product_image_url})` : 'linear-gradient(135deg,#e2e8f0,#cbd5e1)' }} />
      <div>
        <div className="cart-row__name">{item.product_name}</div>
        <div className="cart-row__price">{item.product_price} ₸</div>
      </div>
      <div className="qty-control">
        <button className="qty-btn" onClick={() => onRemove(item.id)}>−</button>
        <strong style={{ minWidth: 34, textAlign: 'center', fontSize: 28 }}>{item.qty}</strong>
        <button className="qty-btn" style={{ background: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }} onClick={() => onAdd(item)}>+</button>
      </div>
      <strong style={{ fontSize: 28 }}>{item.product_price * item.qty} ₸</strong>
    </div>
  );
}

export default function CartScreen({ lang, cart, total, onAdd, onRemove, onClear, onBack, onCheckout }) {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="screen fade-in">
      <div className="cart-layout">
        <div className="panel cart-panel">
          <div className="catalog-header catalog-header--space">
            <div className="catalog-header__left">
              <button className="back-btn" onClick={onBack}>←</button>
              <div className="catalog-title">🛒 {t(lang, 'cart')}</div>
            </div>
            {cart.length > 0 && (
              <button className="ghost-cta" style={{ minHeight: 60, fontSize: 24 }} onClick={onClear}>{t(lang, 'clear')}</button>
            )}
          </div>
          <div className="cart-list">
            {cart.length === 0 ? <div className="empty-state">{t(lang, 'cartEmpty')}</div> : cart.map(item => <CartItem key={item.id} item={item} onAdd={onAdd} onRemove={onRemove} />)}
          </div>
        </div>
        <div className="panel cart-summary">
          <div className="cart-summary__label">Marketa</div>
          <div className="summary-title" style={{ marginTop: 8 }}>Итог заказа</div>
          <div className="cart-summary__total">{total} ₸</div>
          <div className="cart-summary__hint">Проверьте товары перед оплатой</div>
          <div className="cart-summary__meta">
            <span>Позиций</span>
            <strong>{totalItems}</strong>
          </div>
          <div className="summary-list" style={{ marginTop: 18 }}>
            {cart.map(item => <div className="summary-item" key={item.id}><span>{item.product_name} ×{item.qty}</span><strong>{item.product_price * item.qty} ₸</strong></div>)}
          </div>
          <div className="cart-summary__actions">
            <button className="primary-cta" onClick={onCheckout}>{t(lang, 'pay')}</button>
            <button className="ghost-cta" onClick={onBack}>{t(lang, 'back')}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
