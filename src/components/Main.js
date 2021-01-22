import React, { useEffect } from 'react';
import Card from '../components/Card.js';
import Footer from './Footer.js';
import CurrentUserContext from '../contexts/currentUserContext';

export default function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return(
    <>
    <main className="root__main">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" alt="Аватар" src={currentUser.avatar} />
          <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
        </div>
        <div className="profile__profile-wrapper">
          <div className="profile__name-wrapper">
            <h1 className="profile__name" id="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description" id="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__items">
          {props.cards && props.cards.map((card) => {
            return (
              <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}/>
            )
          }
          )}
        </ul>
      </section>
    </main>

    <Footer />

    </>
  )
}
