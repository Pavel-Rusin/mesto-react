import React from 'react'

function ImagePopup ({ card, onClose }) {
    if (!card) { return null }
    else {
        return (
            <section className="popup popup_type_photo popup_opened">
                <figure className="popup__container popup__container_photo">
                    <button className="popup__close popup__photo_close" type="button" onClick={onClose} />
                    <img className="popup__image" src={card.link} alt={card.name} />
                    <p className="popup__description">{card.name}</p>
                </figure>
            </section>
        )
    }
}

export default ImagePopup