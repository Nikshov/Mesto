import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Login from './Login';
import Register from './Register';
import { ProtectedRoute } from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import {
  signIn,
  signUp,
  getInitialCards,
  addNewCard,
  removeCard,
  addLike,
  removeLike,
  getCurrentUserInfo,
  editUserInfo,
  editAvatar,
  signOut,
  check,
} from '../utils/api';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [request, setRequest] = React.useState(true);
  const [deleteCard, setDeleteCard] = React.useState({ isOpen: false });
  const [isSignUpSuccess, setIsSignUpSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (!loggedIn)
      check()
        .then(() => {
          setLoggedIn(true);
          history.push('/');
        })
        .catch(err => console.log(err));
  }, [history, loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false });
    setDeleteCard({ isOpen: false });
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, ...card });
  }

  async function handleUpdateUser({ name, about }) {
    setRequest(false);
    editUserInfo({ name, about })
      .then(data => {
        setCurrentUser(data);
        console.log(currentUser);
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => {
        setRequest(true);
      });
  }

  function handleUpdateAvatar(link) {
    setRequest(false);
    editAvatar(link)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => {
        setRequest(true);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setRequest(false);
    addNewCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setRequest(true);
      });
  }

  function handleCardLike(card, isLiked) {
    (isLiked ? removeLike(card._id) : addLike(card._id))
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    setDeleteCard({ isOpen: true, ...card });
  }

  function handleConfirmDelete(card) {
    setRequest(false);
    removeCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setRequest(true);
      });
  }

  function onRegister({ password, email }) {
    signUp({ password, email })
      .then(() => {
        setIsSignUpSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setIsSignUpSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function onLogIn({ password, email }) {
    signIn({ password, email })
      .then(user => {
        setCurrentUser(user);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  function onSignOut() {
    signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        history.push('/sign-in');
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    Promise.all([getCurrentUserInfo(), getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={currentUser.email} onSignOut={onSignOut} />

      <Switch>
        <ProtectedRoute
          exact
          path='/'
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <Route exact path='/sign-up'>
          <Register signUp={onRegister} />
        </Route>

        <Route exact path='/sign-in'>
          <Login signIn={onLogIn} />
        </Route>

        <Route path='/'>{loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}</Route>
      </Switch>

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        request={request}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        request={request}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        request={request}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <ConfirmDeletePopup
        deleteCard={deleteCard}
        onClose={closeAllPopups}
        request={request}
        confirmDelete={handleConfirmDelete}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSignUpSuccess={isSignUpSuccess}
      />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
