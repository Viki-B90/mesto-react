import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, onCloseEsc, onCloseOverlay, onSubmit, renderLoading, buttonText, buttonTextLoading, children }) {
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', onCloseEsc);
    } else {
      document.removeEventListener('keydown', onCloseEsc);
    }
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', onCloseOverlay);
    } else {
      document.removeEventListener('click', onCloseOverlay);
    }
  }, [isOpen])

  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <button className="popup__close" onClick={onClose} type="button" />
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`popup_form_${name}`} onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__save" type="submit">{renderLoading ? buttonTextLoading : buttonText}</button>
        </form> 
      </div>
    </section>
  )
}

export default PopupWithForm;