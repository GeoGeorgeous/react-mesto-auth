import React from 'react';
import successIcon from '../images/success.svg';
import failureIcon from '../images/failure.svg';

export default function InfoTooltop(props) {
  const { isSuccess, onClose } = props;

  const openClass = props.isOpen ? 'popup_opened' : '';

  return (
    <div className={`popup popup_type_${props.name} ${openClass}`} data-type="place">
      <form className="popup__container">
        <img
          className="popup__image"
          src={isSuccess ? successIcon : failureIcon}
          alt={isSuccess ? 'Успех!' : 'Что-то пошло не так'}
        />
        <h3 className="popup__title popup__title_down">
          {isSuccess ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}
        </h3>
        <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={onClose} />
      </form>
    </div>
  );
}
