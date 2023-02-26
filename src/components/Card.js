import React from 'react';

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <img className="element__image" src={props.card.link} onClick={handleCardClick} alt="" />
      <button className="element__delete" type="button" />
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__for-like">
          <button className="element__like" type="button" />
          <p className="element__counter-like">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;