import { t } from '../i18n';

function ProductCard({ item, cartQty, onAdd, onRemove, lang }) {
  return (
    <div className="product-card fade-in">
      <div className="product-card__image" style={{ backgroundImage: item.product_image_url ? `url(${item.product_image_url})` : 'linear-gradient(135deg,#e2e8f0,#cbd5e1)' }} />
      <div className="product-card__body">
        <div className="product-card__title">{item.product_name}</div>
        <div className="product-card__stock">×{item.quantity} {t(lang, 'inStock')}</div>
        <div className="product-card__bottom">
          <div className="product-card__price">{item.product_price} ₸</div>
          <div className="qty-control">
            {cartQty > 0 && <button className="qty-btn" onClick={() => onRemove(item.id)}>−</button>}
            <button className="add-btn" onClick={() => onAdd(item)}>{cartQty > 0 ? `${cartQty} +` : 'Добавить'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogScreen({ lang, inventory, category, cart, onAdd, onRemove, onBack }) {
  const total = cart.reduce((sum, item) => sum + item.product_price * item.qty, 0);

  return (
    <div className="screen fade-in">
      <div className="screen-grid">
        <div className="panel catalog-panel">
          <div className="catalog-header">
            <button className="back-btn" onClick={onBack}>←</button>
            <div className="catalog-title">{t(lang, category)}</div>
          </div>
          {inventory.length === 0 ? (
            <div className="empty-state">Товары отсутствуют</div>
          ) : (
            <div className="product-grid">
              {inventory.map(item => {
                const qty = cart.find(c => c.id === item.id)?.qty || 0;
                return <ProductCard key={item.id} item={item} cartQty={qty} onAdd={onAdd} onRemove={onRemove} lang={lang} />;
              })}
            </div>
          )}
        </div>
        <div className="panel summary-panel">
          <div className="summary-title">Корзина</div>
          <div className="summary-list">
            {cart.length === 0 ? <div className="summary-item"><span>Пока пусто</span><span>0 ₸</span></div> : cart.map(item => (
              <div className="summary-item" key={item.id}><span>{item.product_name} ×{item.qty}</span><strong>{item.product_price * item.qty} ₸</strong></div>
            ))}
          </div>
          <div className="summary-total">Итого<strong>{total} ₸</strong></div>
        </div>
      </div>
    </div>
  );
}
