import React from 'react';
import successIcon from '../images/success.svg';
import failureIcon from '../images/failure.svg';

export default function InfoTooltop(props) {
  const success = props.isSuccess;

  const openClass = props.isOpen ? 'popup_opened' : '';
  const disabledClass = props.isLoading ? 'popup__save-button_inactive' : '';

  return (
    <div className={`popup popup_type_${props.name} ${openClass}`} data-type="place">
      <form className="popup__container">
        <img
          className="popup__image"
          src={success ? successIcon : failureIcon}
          alt={success ? 'Успех!' : 'Что-то пошло не так'}
        />
        <h3 className="popup__title popup__title_down">
          {success ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}
        </h3>
        <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={props.onClose} />
      </form>
    </div>
  );
}
