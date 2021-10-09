import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, request }) {
  const inputRef = React.useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name='editAvatar'
      title='Обновить аватар'
      buttonText={request ? 'Обновить аватар' : 'Обновление...'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type='url'
        name='link'
        required
        placeholder='Ссылка на картинку'
        className='popup__input popup__input_field_image-url'
        id='link-input'
      />
      <span className='popup__input-error popup__input-error_type_url link-input-error' />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
