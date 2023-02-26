import React from 'react';

function ImagePopup(props) {
  return (
    <section className={`popup popup_img ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container-image">
        <button className="popup__close" onClick={props.onClose} type="button" />
        <img className="popup__image" src={props.card.link} alt="" />
        <h3 className="popup__title-image">{props.card.name}</h3>
      </div>
    </section>
  );
}

export default ImagePopup;