import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, submitButtonText, onAddPlace, loadingText, isLoading}) {


  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');
  const [newCard, setNewCard] = React.useState({
    name: '',
    link: ''
  });

  function handleOnChange(e) {
    // слабенькая проверка, нужно улучшить или избавиться совсем
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewCard({...newCard,
      [name]: value} );
      target.name === 'name'
      ? setCardName(value)
      : setCardLink(value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(newCard)
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
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
            id="name"
            className="popup__form-item popup__form-item_input_name"
            type="text"
            placeholder="Название"
            onChange={ e => handleOnChange(e)}
            name="name"
            minLength="1"
            maxLength="30"
            value={cardName || ''}
            required />
            <span id="title-error" className="popup__form-error"></span>
          </div>
          <div className="popup__form-item-group">
            <input
            id="link"
            className="popup__form-item popup__form-item_input_description"
            type="url"
            placeholder="Ссылка на картинку"
            onChange={ e => handleOnChange(e)}
            name="link"
            value={cardLink || ''}
            required />
            <span id="link-error" className="popup__form-error"></span>
          </div>
        </>
      )}
  />)

}
