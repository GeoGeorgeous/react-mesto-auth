/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Route, Switch, useHistory, Redirect,
} from 'react-router-dom';
import CurrentUserContext from '../contexts/currentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import authApi from '../utils/AuthApi';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoTooltip from './InfoTooltip';
import AddPlacePopup from './AddPlacePopup';

function App() {
  document.title = 'Mesto Russia';

  // useState
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [isToolTipOpen, setToolTipOpen] = React.useState(false);
  const [isToolTipSuccess, setToolTipSuccess] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const history = useHistory();

  // Хендлеры onclick
  const handleEditProfileClick = () => { setEditProfilePopupOpen(true); };
  const handleAddPlaceClick = () => { setAddPlacePopupOpen(true); };
  const handleEditAvatarClick = () => { setEditAvatarPopupOpen(true); };
  const handleDeleteButtonClick = () => { setConfirmDeletePopupOpen(true); };
  const handleToolTipOpen = (status) => {
    const { success } = status;
    setToolTipSuccess(success);
    setToolTipOpen(true);
  };
  const handleCardClick = (card) => { setSelectedCard(card); };
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setToolTipOpen(false);
    setSelectedCard({});
  };

  function fetchCards(jwt) {
    api.setToken(jwt);
    api.getCards()
      .then((loadedCards) => {
        setCards(loadedCards.reverse());
      })
      .catch((err) => console.error(err));
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.verify(jwt)
        .then((user) => {
          api.setToken(jwt);
          setLoggedIn(true);
          history.push('/');
          setEmail(user.email);
          setCurrentUser(user);
          fetchCards(jwt);
        });
    }
  }

  function handleLogin() {
    tokenCheck();
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        // Обновляем стейт
        api.getCards()
          .then((loadedCards) => {
            setCards(loadedCards.reverse());
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    // Снова проверяем, являемся ли мы овнером карточки
    if (card.owner === currentUser._id) {
      api.deleteCard(card)
        .then(() => {
        // Обновляем стейт
          setCards(cards.filter((c) => c._id !== card._id));
        })
        .catch((err) => console.error(err));
    }
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    api.setUser(userData)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateAvatar(imgSrc) {
    setLoading(true);
    api.setAvatar(imgSrc)
      .then((user) => {
        setCurrentUser(user.data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api.uploadCard(card)
      .then((uploadedCard) => {
        setCards([uploadedCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  // Разметка приложения
  return (
    <Switch>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="root">
          <Route exact path="/sign-in">
            <Login
              handleLogin={handleLogin}
              loggedIn={loggedIn}
            />
          </Route>

          <Route path="/sign-up">
            <Register
              handleToolTipOpen={handleToolTipOpen}
            />
          </Route>

          <ProtectedRoute
            path="/app"
            email={email}
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />

          <Route path="/">
            {loggedIn ? <Redirect to="/app" /> : <Redirect to="/sign-in" />}
          </Route>

          <InfoTooltip
            isOpen={isToolTipOpen}
            isSuccess={isToolTipSuccess}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            submitButtonText="Сохранить"
            loadingText="Загрузка..."
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            submitButtonText="Сохранить"
            loadingText="Загрузка..."
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            submitButtonText="Добавить"
            loadingText="Добавление..."
            isLoading={isLoading}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="confirm-delete"
            title="Вы уверены?"
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            children={(
              <button className="popup__save-button popup__save-button_context_confirm-delete" type="submit">Да</button>
              )}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

        </div>
      </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;
