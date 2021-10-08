import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, request }) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }


  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }



  return (
    <PopupWithForm onSubmit={handleSubmit} name='edit-profile' title='Редактировать профиль' buttonText={request ? 'Сохранить' : 'Сохранение...'} isOpen={isOpen} onClose={onClose}  >
      <input
        type="text"
        id="name-input"
        name="name"
        className="popup__input popup__input_field_name"
        placeholder="Отображаемое имя"
        minLength={2}
        maxLength={40}
        required
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error popup__input-error_type_name name-input-error" />
      <input
        type="text"
        id="about-input"
        name="about"
        className="popup__input popup__input_field_about"
        placeholder="деятельность"
        minLength={2}
        maxLength={200}
        required
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error popup__input-error_type_about about-input-error" />
    </PopupWithForm >
  )
}

export default EditProfilePopup;