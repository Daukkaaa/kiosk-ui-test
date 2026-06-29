import { t } from '../i18n';

export default function Header({ lang, cartCount, cartTotal, onHome, onGoCart }) {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <button className="icon-btn" onClick={onHome} aria-label={t(lang, 'home')}>🏠</button>
        <div className="brand-lockup">
          <img className="brand-logo" src="/logo.png" alt="Marketa" />
          <div className="brand-title">Marketa</div>
        </div>
      </div>
      <div className="topbar__right">
        {cartCount > 0 && (
          <button className="cart-chip" onClick={onGoCart}>🛒 {cartCount} · {cartTotal} ₸</button>
        )}
      </div>
    </div>
  );
}
