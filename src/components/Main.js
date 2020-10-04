import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main ({ onEditProfile, onEditAvatar, onAddElement, onCardClick, cards, onCardDelete, onCardLike }) {
    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                    <button className="profile__button_avatar" onClick={ onEditAvatar } />
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__fullname">{currentUser.name}</h1>
                        <button className="profile__button profile__button_edit" type="button" onClick={ onEditProfile } aria-label="Редактировать"/>
                    </div>
                <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button className="profile__button profile__button_add" type="button" onClick={ onAddElement } aria-label="Добавить фото" />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                            <Card 
                                key={card._id}
                                card={card} 
                                onCardClick={ onCardClick }
                                onCardDelete={ onCardDelete }
                                onCardLike={ onCardLike }
                            />
                        )
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main