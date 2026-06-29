import { t } from '../i18n';

const FIXED_CATEGORIES = [
  { key: 'Напитки', emoji: '🥤', color: '#3b82f6', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80' },
  { key: 'Снэки', emoji: '🍿', color: '#f59e0b', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1200&q=80' },
  { key: 'Еда', emoji: '🍱', color: '#16a34a', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80' },
];

export default function CategoriesScreen({ lang, categories, loading, onSelect }) {
  if (loading) {
    return <div className="loading-state"><div><div className="spinner" /><div>Загрузка...</div></div></div>;
  }

  const available = FIXED_CATEGORIES.filter(c => categories.includes(c.key));

  return (
    <div className="screen fade-in">
      <div className="page-body">
        <h2 className="section-title">{t(lang, 'selectCategory')}</h2>
        <div className="category-grid">
          {available.map(cat => (
            <button
              key={cat.key}
              className="category-card"
              onClick={() => onSelect(cat.key)}
              style={{ borderColor: `${cat.color}26` }}
            >
              <div className="category-card__image" style={{ backgroundImage: `linear-gradient(rgba(15,23,42,.02), rgba(15,23,42,.02)), url(${cat.image})` }} />
              <div className="category-card__footer">
                <div className="category-card__title" style={{ color: cat.color }}>{cat.key}</div>
                <div className="category-card__meta">{cat.emoji} {t(lang, 'tapToStart')}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
