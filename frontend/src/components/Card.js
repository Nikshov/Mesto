import CurrentUserContext from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className='element'>
      {isOwn && (
        <button
          type='button'
          className='element__delete-button'
          onClick={handleDeleteClick}
          aria-label="кнопка 'удалить'"></button>
      )}
      <img className='element__image' src={card.link} alt={card.name} onClick={handleClick} />
      <div className='element__panel'>
        <h2 className='element__title'>{card.name}</h2>
        <div className='element__likes'>
          <button
            type='button'
            className={`element__heart-button ${isLiked && 'element__heart-button_active'}`}
            onClick={handleLikeClick}
            aria-label='отметить место как понравившееся'></button>
          <p className='element__amount-likes'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
