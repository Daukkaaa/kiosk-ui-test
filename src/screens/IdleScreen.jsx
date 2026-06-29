import { t, LANGUAGES } from '../i18n';

export default function IdleScreen({ onSelectLang }) {
  return (
    <div className="screen hero-start fade-in">
      <div className="hero-start__content">
        <div className="start-logo">
          <img src="/group-35197.png" alt="Marketa" />
        </div>
        <h1 className="start-title">Marketa</h1>
        <p className="start-subtitle">Сусындар • Снэктер • Тағамдар</p>
        <p className="start-prompt">{t('ru', 'tapToStart')}</p>
        <div className="lang-grid">
          {LANGUAGES.map((l) => (
            <button key={l.code} className="lang-card" onClick={() => onSelectLang(l.code)}>
              <span className="lang-card__flag">{l.flag}</span>
              <span className="lang-card__label">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
