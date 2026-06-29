export default function PickupScreen({ doorFlow, doorClosed, secondsLeft }) {
  const isWaitClose = doorFlow === 'wait_close';
  const title = isWaitClose ? 'Закройте дверь' : 'Можете забрать товар';
  const subtitle = isWaitClose
    ? 'Пожалуйста, закройте дверь холодильника, чтобы продолжить'
    : doorClosed
      ? 'Откройте дверь и заберите товар'
      : 'Заберите товар и закройте дверь';

  return (
    <div className={`screen pickup-screen ${isWaitClose ? 'pickup-screen--wait' : 'pickup-screen--ready'} fade-in`}>
      <div className="pickup-visual">
        <img src="/figma-svg-kiosk/screen-6-pickup.svg" alt="pickup" />
      </div>
      <div className="pickup-copy">
        <div className="pickup-copy__eyebrow">Marketa</div>
        <div className="pickup-copy__title">{title}</div>
        <div className="pickup-copy__text">{subtitle}</div>
        <div className="pickup-badges">
          <div className="pickup-badge">Дверь: {doorClosed ? 'закрыта' : 'открыта'}</div>
          {!isWaitClose && <div className="pickup-badge">Время: {secondsLeft} сек</div>}
          {isWaitClose && <div className="pickup-badge">Новая покупка доступна после закрытия двери</div>}
        </div>
      </div>
    </div>
  );
}
