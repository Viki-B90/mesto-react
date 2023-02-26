import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  React.useEffect(() => {
    function handleEscClose(event) {
      const escape = 'Escape';
      event.key === escape && closeAllPopups();
    }

    function handleOverlayClose(event) {
      const eventTarget = event.target;
      if (eventTarget.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('click', handleOverlayClose);

    return () => {
      window.removeEventListener('click', handleOverlayClose);
      window.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(dataCard) {
    setSelectedCard(dataCard);
    setImagePopupOpen(true);
  }

  return (
    <div className="App">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick} 
      />
      <Footer />
      <PopupWithForm
        name={"edit"}
        title={"Редактировать профиль"}
        nameForm={"edit"}
        buttonText={"Сохранить"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" className="popup__input popup__input_type_name" placeholder="Имя" required />
        <span className="popup__error name-input-error"></span>
        <input type="text" className="popup__input popup__input_type_info" id="info-input" name="about" placeholder="О себе" required />
        <span className="popup__error info-input-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name={"new-avatar"}
        title={"Обновить аватар"}
        nameForm={"avatar"}
        buttonText={"Сохранить"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input type="url" className="popup__input popup__input_type_avatar" id="link-avatar" name="avatar" placeholder="Ссылка на новый аватар" required />
        <span className="popup__error link-avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name={"add"}
        title={"Новое место"}
        nameForm={"place"}
        buttonText={"Создать"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input type="text" className="popup__input popup__input_type_title" id="title-input" name="name" placeholder="Название" required />
        <span className="popup__error title-input-error"></span>
        <input type="url" className="popup__input popup__input_type_link" id="url-input" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__error url-input-error"></span>
      </PopupWithForm>
      <ImagePopup card={selectedCard} isOpen={imagePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm
        name={"delete"}
        title={"Вы уверены?"}
        nameForm={"delete"}
        buttonText={"Да"}
      >
      </PopupWithForm>
    </div>
  );
}

export default App;