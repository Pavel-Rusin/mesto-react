import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const [ formValues, setFormValues ] = React.useState({
        name: "",
        about: ""
    })

    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        setFormValues(currentUser)
    }, [currentUser, isOpen]);


    const handleInputChange = React.useCallback(
        (e) => {
            const { name, value } = e.target
            setFormValues((prevState) => ({ ...prevState, [name]: value }))
        },
        [setFormValues]
    )

    function handleSubmit(e) {
        e.preventDefault()

        onUpdateUser({
            name,
            about
        })
    }

    const { name, about } = formValues

    return(
        <PopupWithForm name="shape" title="Редактировать профиль" isOpen={ isOpen } onClose={ onClose} onSubmit={ handleSubmit } >
            <>
                <input type="text" onChange={ handleInputChange } value={ name } className="popup__input popup__input_fullname" name="name" 
                    id="fullname-input" minLength="2" maxLength="40" placeholder="Как Вас зовут?" required />
                <span className="popup__error" id="fullname-input-error" />
                <input type="text" onChange={ handleInputChange } value={ about } className="popup__input popup__input_subtitle" name="about"
                    id="subtitle-input" minLength="2" maxLength="200" placeholder="Напишите о себе" required />
                <span className="popup__error" id="subtitle-input-error" />
                <button className="popup__submit popup__button_type_submit popup__button_type_info" type="submit">
                    { isLoading ? 'Загрузка...' : 'Сохранить' }
                </button>
        </>
        </PopupWithForm>
    )
}

export default EditProfilePopup