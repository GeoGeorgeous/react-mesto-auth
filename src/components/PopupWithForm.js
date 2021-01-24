import React from 'react';

export default function PopupWithForm(props) {
  const {
    isOpen, isLoading, name, title, onSubmit, onClose, children, loadingText, submitButtonText,
  } = props;
  const openClass = isOpen ? 'popup_opened' : '';
  const disabledClass = isLoading ? 'popup__save-button_inactive' : '';

  return (
    <div className={`popup popup_type_${name} ${openClass}`} data-type="place">
      <form className="popup__container" name={name} id={name} onSubmit={onSubmit} noValidate>
        <h3 className="popup__title">{title}</h3>
        <fieldset className="popup__form" form={name}>
          {children}
          <button className={`popup__save-button ${disabledClass}`} type="submit" disabled={!isLoading}>{isLoading ? loadingText : submitButtonText}</button>
        </fieldset>
        <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={onClose} />
      </form>
    </div>
  );
}
