import React from 'react';
import CurrentUserContext from '../contexts/currentUserContext'; // Импортируем контекст

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  let cardLikeButtonClassName = (
    `card__like-button ${isLiked ? 'card__like-button_active' : ''}`
  );

  function handleCardClick() {
    // Передаём название и ссылку нажатой картинки в компонент App для открытия lightbox:
    onCardClick(card)
  }

  function handleLikeClick() {
    // Передаём карточку для изменения лайка:
    onCardLike(card)
  }

  function handleDeleteClick() {
    // Передаём карточку для удаления:
    onCardDelete(card)
  }

  return(
    <li className="card" key={card.key}>
      <img className="card__image" src={card.link} alt={card.title} onClick={handleCardClick} />
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick}></button>
      <div className="card__content">
        <h2 className="card__title">{card.name}</h2>
        <div>
        <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
          <p className="card__likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}
