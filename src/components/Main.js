import React from 'react';
import Card from './Card';
import Footer from './Footer';
import CurrentUserContext from '../contexts/currentUserContext';

export default function Main(props) {
  const {
    onEditAvatar, onEditProfile, onAddPlace, cards,
  } = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <main className="root__main">
        <section className="profile">
          <div className="profile__avatar">
            <img className="profile__avatar-image" alt="Аватар" src={currentUser.avatar} />
            <div className="profile__avatar-edit" onClick={onEditAvatar} />
          </div>
          <div className="profile__profile-wrapper">
            <div className="profile__name-wrapper">
              <h1 className="profile__name" id="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
            </div>
            <p className="profile__description" id="profile__description">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace} />
        </section>
        <section className="cards">
          <ul className="cards__items">
            {cards && cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>

      <Footer />

    </>
  );
}
