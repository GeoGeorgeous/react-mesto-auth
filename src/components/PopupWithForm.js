import React from 'react';

export default function PopupWithForm(props) {

  const openClass = props.isOpen ? 'popup_opened' : '';
  const disabledClass = props.isLoading ? 'popup__save-button_inactive' : ''


  return (
    <div className={`popup popup_type_${props.name} ${openClass}`} data-type="place">
          <form className="popup__container" name={props.name} id={props.name} onSubmit={props.onSubmit} noValidate>
            <h3 className="popup__title">{props.title}</h3>
              <fieldset className="popup__form" form={props.name}>
              {props.children}
              <button className={`popup__save-button ${disabledClass}`} type="submit" disabled={props.isLoading ? true : false}>{props.isLoading ? props.loadingText : props.submitButtonText}</button>
              </fieldset>
              <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={props.onClose}></button>
          </form>
    </div>
  )
}
