import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <div
          onClick={onEditAvatar}
          className='profile__avatar-container'
          style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
        <div className='profile__info'>
          <h1 className='profile__info-name'>{currentUser.name}</h1>
          <p className='profile__info-about'>{currentUser.about}</p>
          <button
            type='button'
            className='profile__edit-button'
            aria-label='редактировать информацию в профиле'
            onClick={onEditProfile}
          />
        </div>
        <button
          type='button'
          className='profile__add-button'
          aria-label='добавить новое место'
          onClick={onAddPlace}
        />
      </section>
      <section className='elements'>
        {cards.map(card => (
          <Card
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            card={card}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
