import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Router } from 'react-router-dom';
import CurrentUserContext from '../contexts/currentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';


function App() {
  // useState
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // Хенделры onclick
  const handleEditProfileClick = () => {setEditProfilePopupOpen(false)};
  const handleAddPlaceClick = () => {setAddPlacePopupOpen(true)};
  const handleEditAvatarClick = () => {setEditAvatarPopupOpen(true)};
  const handleDeleteButtonClick = () => {setConfirmDeletePopupOpen(true)};
  const handleCardClick = (card) => {setSelectedCard(card)};
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked)
    .then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    })
    .catch(err => console.error(err))
  }

  function handleCardDelete(card){
  // Снова проверяем, являемся ли мы овнером карточки
  const isOwner = card.owner._id === currentUser._id; // ??
  api.deleteCard(card)
  .then(() => {
    // Обновляем стейт
    setCards(cards.filter( c => c._id !== card._id))
  })
  .catch(err => console.error(err))
  }


  function handleUpdateUser(userData) {
    setLoading(true)
    api.setUser(userData)
    .then(user => {
      setCurrentUser(user)
      closeAllPopups();
    })
    .catch(err => console.error(err))
    .finally(() => {
      setLoading(false)
    })
  }

  function handleUpdateAvatar(imgSrc) {
    setLoading(true);
    api.setAvatar(imgSrc)
    .then(user => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch(err => console.error(err))
    .finally(() => {
      setLoading(false)
    })
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true)
    api.uploadCard(card)
    .then(uploadedCard => {
      setCards([uploadedCard, ...cards]);
      closeAllPopups()
    })
    .catch(err => console.error(err))
    .finally(() => {
      setLoading(false)
    })
  }


  useEffect( () => {
    Promise.all([
      api.getUser(),
      api.getCards()
    ])
    .then(values => {
      console.log('👍 Успешно подключились к серверу и получили данные!');
      const [user, cards] = values
      setCurrentUser(user);
      setCards(cards);
    })
    .catch(err => console.error(err))
  }, [])

  // Разметка приложения
  return (
    <BrowserRouter>
        <CurrentUserContext.Provider value={currentUser}>
          <div className="root">

            <Route exact path="/sign-in">
              <Login />
            </Route>

            <Route path="/sign-up">
              <Register />
            </Route>

            <ProtectedRoute
              path="/"
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


          </div>
        </CurrentUserContext.Provider>
    </BrowserRouter>
  )
}

export default App;
