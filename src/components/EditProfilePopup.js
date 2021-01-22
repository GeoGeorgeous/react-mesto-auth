import React from 'react';
import CurrentUserContext from '../contexts/currentUserContext.js';
import PopupWithForm from './PopupWithForm';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, submitButtonText, loadingText, isLoading}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [about, setAbout] = React.useState(currentUser.about);


  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about
    });
  }

  return (
    <PopupWithForm
      name="profle"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}
      loadingText={loadingText}
      isLoading={isLoading}
      children={(
        <>
          <div className="popup__form-item-group">
            <input
            id="username"
            className="popup__form-item popup__form-item_input_name"
            type="text"
            placeholder="Имя"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            name="name"
            minLength="2"
            maxLength="40"
            required />
            <span id="username-error" className="popup__form-error"></span>
          </div>
          <div className="popup__form-item-group">
            <input
            id="description"
            className="popup__form-item popup__form-item_input_description"
            type="text"
            placeholder="Описание профиля"
            value={about || ''}
            onChange={(e) => setAbout(e.target.value)}
            name="about"
            minLength="2"
            maxLength="200"
            required />
            <span id="description-error" className="popup__form-error"></span>
          </div>
        </>
      )}
  />)
}
