import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmationPopup from './ConfirmationPopup'
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [renderLoading, setRenderLoading] = React.useState(false)

  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }, []);

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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleOverlayClose(event) {
     if (event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.setLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
      } else {
      api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
        });
      }
  }

  function handleUpdateUser(data) {
    setRenderLoading(true);
    api.setUserProfile(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false)
      });
  }

  function handleUpdateAvatar(data) {
    setRenderLoading(true);
    api.changeUserAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false)
      });
  }

  function handleAddPlaceSubmit(data) {
    setRenderLoading(true);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        setRenderLoading(false)
      });
  }

  function handleConfirmClick(card) {
    setConfirmationPopupOpen(true);
    setCardDelete(card)
  }

  function handleCardDelete() {
    api.deleteCard(cardDelete._id)
      .then(() => {
        setCards((state) => state.filter(c => c._id !== cardDelete._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      }); 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike = {handleCardLike}
          onCardDelete={handleConfirmClick}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}  
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
          onUpdateUser={handleUpdateUser} 
          renderLoading={renderLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
          onUpdateAvatar = {handleUpdateAvatar} 
          renderLoading={renderLoading}
        />
        <AddPlacePopup
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopups}
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
          onAddPlace = {handleAddPlaceSubmit}
          renderLoading = {renderLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={imagePopupOpen}
          onClose={closeAllPopups}
          onCloseEsc = {handleEscClose}
          onCloseOverlay = {handleOverlayClose}
        />
        <ConfirmationPopup 
          isOpen={isConfirmationPopupOpen} 
          onClose={closeAllPopups} 
          onDeletePlace={handleCardDelete} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;