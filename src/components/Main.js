import React from 'react';
import pencil from '../images/icon_pencil.svg';
import plus from '../images/icon_plus.svg';
import Card from '../components/Card'
import { api } from '../utils/api';

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserProfile(), api.getInitialCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setCards(dataCard);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__ava">
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <button className="profile__avatar-button" onClick={props.onEditAvatar} type="button"></button>
        </div>
        <div className="profile__content">
          <div className="profile__user">
            <h1 className="profile__info profile__info_type_name">{userName}</h1>
            <p className="profile__info profile__info_type_about-me">{userDescription}</p>
          </div>
          <button className="profile__edit" onClick={props.onEditProfile} type="button">
            <img className="profile__icon-pencil" src={pencil} alt="Редактировать" />
          </button>
        </div>
        <button className="profile__add" onClick={props.onAddPlace} type="button">
          <img className="profile__icon-plus" src={plus} alt="Добавить" />
        </button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (<Card key={card._id} card={card} onCardClick={props.onCardClick} />))}
        </ul>
      </section>
    </main>
  );
}

export default Main;