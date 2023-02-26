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
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
    document.documentElement.classList.add('popup_opened');

    return () => {
      document.documentElement.classList.remove('popup_opened');
      document.removeEventListener('click', handleOverlayClose);
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  function handleEscClose(event) {
    const escape = 'Escape';
    if (event.key === escape) {
      closeAllPopups();
    }
  }

  function handleOverlayClose(event) {
    const eventTarget = event.target;
    if (eventTarget.classList.contains('popup')) {
      closeAllPopups();
    }
  }

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
        <input
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Имя"
          required
        />
        <span className="popup__error name-input-error" />
        <input
          className="popup__input popup__input_type_info"
          type="text"
          id="info-input"
          name="about"
          placeholder="О себе"
          required 
        />
        <span className="popup__error info-input-error" />
      </PopupWithForm>
      <PopupWithForm
        name={"new-avatar"}
        title={"Обновить аватар"}
        nameForm={"avatar"}
        buttonText={"Сохранить"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_avatar"
          type="url"
          id="link-avatar"
          name="avatar"
          placeholder="Ссылка на новый аватар"
          required
        />
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
        <input
          className="popup__input popup__input_type_title"
          type="text"
          id="title-input"
          name="name"
          placeholder="Название"
          required
        />
        <span className="popup__error title-input-error" />
        <input
          className="popup__input popup__input_type_link"
          type="url"
          id="url-input"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error url-input-error" />
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        isOpen={imagePopupOpen}
        onClose={closeAllPopups}
      />
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