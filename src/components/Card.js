import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card ({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext)

    function handleClick() {
        onCardClick(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    const isOwn = card.owner._id === currentUser._id

    const cardDeleteButtonClassName = (
        `element__delete ${isOwn ? 'element__delete_visible' : 'element__delete_hidden'}`
    );
    
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_clicked'}`
    )


    return (
        <li className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={ handleClick }/>
            <button className={ cardDeleteButtonClassName } type="button" aria-label="Удалить" onClick={ handleDeleteClick } />
            <div className="element__description">
                <h3 className="element__text">{card.name}</h3>
                <div className="element__like_container">
                    <button className={ cardLikeButtonClassName } type="button" onClick={ handleLikeClick } />
                    <p className="element__like_place">{card.likes.length > 0 ? card.likes.length : ''}</p>
                </div>
            </div>
        </li>
    )

}

export default Card