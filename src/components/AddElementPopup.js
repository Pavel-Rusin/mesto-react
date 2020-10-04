import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddElementPopup({ isOpen, onClose, onAddElement, isLoading }) {

    const [ formValues, setFormValues ] = React.useState({
        name: "",
        link: ""
    })

    React.useEffect(() => {
        setFormValues({
            name: "",
            link: ""
        })
    }, [isOpen])

    const handleInputChange = React.useCallback(
        (e) => {
            const { name, value } = e.target
            setFormValues((prevState) => ({ ...prevState, [name]: value }))
        }, [setFormValues]
    )

    function handleSubmit(e) {
        e.preventDefault()

        onAddElement({
            name,
            link
        })
    }

    const { name, link } = formValues

    return(
        <PopupWithForm name="image" title="Новое место" isOpen={ isOpen } onClose={ onClose } onSubmit={ handleSubmit }>
          <>
          <input onChange={ handleInputChange } value={ name } type="text" className="popup__input popup__input_name" name="name"
            placeholder="Название" id="image-name" minLength="1" maxLength="30" required />
          <span className="popup__error" id="image-name-error" />
          <input onChange={ handleInputChange } value={ link } type="url" className="popup__input popup__input_image" name="link"
            placeholder="Ссылка на картинку" id="image-url" required />
          <span className="popup__error" id="image-url-error" />
          <button className="popup__submit popup__button_type_submit popup__button_type_element" type="submit">
            { isLoading ? 'Загрузка...' : 'Создать' }
          </button>
          </>
        </PopupWithForm> 
    )
}

export default AddElementPopup