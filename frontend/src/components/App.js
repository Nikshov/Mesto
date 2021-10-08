import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import * as authApi from "../utils/authApi";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

//Пока отправляю минимальное для сдачи задание, так как не успеваю. Мобиьные стили и пр.(например кастомную валидацию) планирую добавить позже

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [request, setRequest] = React.useState(true);
  const [deleteCard, setDeleteCard] = React.useState({ isOpen: false });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const history = useHistory();

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

  async function handleUpdateUser(data) {
    setRequest(false);
    api
      .editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setRequest(true);
      });
  }

  function handleUpdateAvatar(data) {
    setRequest(false);
    api
      .editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setRequest(true);
      });
  }

  function handleAddPlaceSubmit(data) {
    setRequest(false);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setRequest(true);
      });
  }

  function handleCardLike(card, isLiked) {
    (isLiked ? api.deleteLike(card._id) : api.addLike(card._id))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    setDeleteCard({ isOpen: true, ...card });
  }

  function handleConfirmDelete(card) {
    setRequest(false);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setRequest(true);
      });
  }

  function onRegister({ password, email }) {
    authApi
      .signUp({ password, email })
      .then((res) => {
        setIsSignUpSuccess(true);
        setIsInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        setIsSignUpSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function onLogIn({ password, email }) {
    authApi
      .signIn({ password, email })
      .then((res) => {
        localStorage.setItem("JWT", res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }
  function onSignOut() {
    setLoggedIn(false);
    setEmail("");
    localStorage.removeItem("JWT");
    history.push("/sign-in");
  }

  React.useEffect(() => {
    if (localStorage.getItem("JWT")) {
      authApi
        .checkJWT(localStorage.getItem("JWT"))
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => console.error(err));
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userdata, initialCards]) => {
        setCurrentUser(userdata);
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onSignOut={onSignOut} />

      <Switch>
        <ProtectedRoute
          exact
          path="/"
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
        <Route exact path="/sign-up">
          <Register signUp={onRegister} />
        </Route>

        <Route exact path="/sign-in">
          <Login signIn={onLogIn} />
        </Route>

        <Route path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
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
