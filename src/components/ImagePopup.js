import React from 'react';
export default function ImagePopup(props) {
  const openClass = props.card.link ? 'popup_opened' : '';
  const cardLink = props.card.link ? props.card.link : '#';
  const cardtitle = props.card.name ? props.card.name : '#'

  return(
    <div className={`popup popup_darkness_lightbox ${openClass}`} data-type="lightbox">
      <figure className="lightbox">
        <button className="popup__close-button" type="reset" aria-label="Закрыть" onClick={props.onClose}></button>
        <img className="lightbox__image" src={cardLink} alt={cardtitle} />
        <figcaption className="lightbox__caption">{cardtitle}</figcaption>
      </figure>
    </div>
  )
}
