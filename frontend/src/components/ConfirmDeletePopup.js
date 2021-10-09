import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ onClose, request, confirmDelete, deleteCard }) {
  function handleCardDelete(evt) {
    evt.preventDefault();

    confirmDelete(deleteCard);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText={request ? 'Да' : 'Удаление...'}
      isOpen={deleteCard.isOpen}
      onClose={onClose}
      onSubmit={handleCardDelete}></PopupWithForm>
  );
}

export default ConfirmDeletePopup;
