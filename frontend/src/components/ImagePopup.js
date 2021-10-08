function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_img-viewer ${card.isOpen && 'popup_opened'}`}>
      <div className="popup__viewer">
        <button
          onClick={onClose}
          type="button"
          className="popup__close-button popup__close-button_type_img-viewer"
          aria-label="кнопка закрыть"
        />
        <img className="popup__img" src={card.link} alt={`Фото: ${card.name}`} />
        <p className="popup__place-name">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;