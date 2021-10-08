import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, request }) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');


  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function clearInputs() {
    setName('');
    setLink('');
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    clearInputs();
  },
    [isOpen]
  );

  return (
    <PopupWithForm onSubmit={handleSubmit} name='add-place' title='Новое место' buttonText={request ? 'Добавить' : 'Добавление...'} isOpen={isOpen} onClose={onClose} >
      <input
        type="text"
        id="title-input"
        name="name"
        className="popup__input popup__input_field_place-name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        onChange={handleNameChange}
        value={name}
      />
      <span className="popup__input-error popup__input-error_type_title title-input-error" />
      <input
        type="url"
        id="url-input"
        name="link"
        className="popup__input popup__input_field_image-url"
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
        value={link}
        required
      />
      <span className="popup__input-error popup__input-error_type_url url-input-error" />
    </PopupWithForm >
  )
}

export default AddPlacePopup;