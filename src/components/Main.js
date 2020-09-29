import React from 'react';
import api from './api.js';
import Card from './Card.js';

function Main ({ onEditProfile, onEditAvatar, onAddElement, onCardClick }) {
    const [userAvatar, setUserAvatar] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                const [userData, initialCards] = values
                setUserAvatar(userData.avatar)
                setUserName(userData.name)
                setUserDescription(userData.about)
                setCards([...initialCards])
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }}>
                    <button className="profile__button_avatar" onClick={ onEditAvatar } />
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__fullname">{userName}</h1>
                        <button className="profile__button profile__button_edit" type="button" onClick={ onEditProfile } aria-label="Редактировать"/>
                    </div>
                <p className="profile__subtitle">{userDescription}</p>
                </div>
                <button className="profile__button profile__button_add" type="button" onClick={ onAddElement } aria-label="Добавить фото" />
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                            <Card key={card._id} card={card} onCardClick={ onCardClick }/>
                        )
                    )}
                </ul>
            </section>
        </main>
    )
}

export default Main