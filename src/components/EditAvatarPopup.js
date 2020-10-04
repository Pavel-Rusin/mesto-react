import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const [link, setLink ] = React.useState("");

    React.useEffect(() => {
        setLink("")
    }, [isOpen])

    const handleInputChange = React.useCallback(
        (e) => {
            setLink(e.target.value)
        },
        [setLink]
    )

    function handleSubmit(e) {
        e.preventDefault()

        onUpdateAvatar({
            avatar: link
        })
    }

    return(
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={ isOpen } onClose={ onClose } onSubmit={ handleSubmit }>
            <>
                <input  onChange={ handleInputChange } value={ link }type="url" className="popup__input popup__input_avatar" 
                    name="avatar" id="image-avatar-url" placeholder="Загрузить аватар" required />
                <span className="popup__error" id="image-avatar-url-error" />
                <button className="popup__submit popup__button_type_submit popup__button_type_avatar" type="submit">
                    { isLoading ? 'Загрузка...' : 'Сохранить' }
                </button>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup