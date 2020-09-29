import React from 'react'

function Card ({ card, onCardClick }) {
    return (
        <li className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="element__description">
                <h3 className="element__text">{card.name}</h3>
                <div className="element__like_container">
                    <button className="element__like" type="button" />
                    <p className="element__like_place">{card.likes.length > 0 ? card.likes.length : ''}</p>
                </div>
            </div>
        </li>
    )

    function handleClick() {
        onCardClick(card)
    }
}

export default Card