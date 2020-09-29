import React from 'react'

function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <form className="popup__container popup__form" name={props.name} method="get" action="#" noValidate>
                <button className="popup__close" type="button" onClick={props.onClose} />
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
            </form>
        </div>
    )
}

export default PopupWithForm