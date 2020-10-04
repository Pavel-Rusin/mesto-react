import React from 'react'

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
            <form className="popup__container popup__form" name={name} method="get" action="#" onSubmit={ onSubmit } noValidate>
                <button className="popup__close" type="button" onClick={onClose} />
                <h2 className="popup__title">{title}</h2>
                {children}
            </form>
        </div>
    )
}

export default PopupWithForm