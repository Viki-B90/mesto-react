import React from 'react';

function PopupWithForm(props) {
  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <button className="popup__close" onClick={props.onClose} type="button"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.nameForm}`} name={`popup_form_${props.nameForm}`} noValidate>
          {props.children}
          <button className="popup__save" type="submit">{props.buttonText}</button>
        </form> 
      </div>
    </section>
  )
}

export default PopupWithForm;