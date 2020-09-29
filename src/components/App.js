import React from 'react';
import Footer from './Footer.js';
import Header from './Header.js';
import ImagePopup from './ImagePopup.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddElementPopupOpen, setIsAddElementPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddElementClick() {
    setIsAddElementPopupOpen(true)
  }

  function closeAllPopup() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddElementPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
    <div className="page">
      <div className="root">
        <Header />
        <Main 
          onEditAvatar={ handleEditAvatarClick }
          onEditProfile={ handleEditProfileClick }
          onAddElement={ handleAddElementClick }
          onCardClick={ handleCardClick }
        />
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup}>
          <>
          <input type="url" className="popup__input popup__input_avatar" name="avatar" id="image-avatar-url"  required />
          <span className="popup__error" id="image-avatar-url-error" />
          <button className="popup__submit popup__button_type_submit popup__button_type_avatar" type="submit">Сохранить</button>
          </>
        </PopupWithForm>
        <PopupWithForm name="shape" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopup}>
          <>
          <input type="text" className="popup__input popup__input_fullname" name="name" 
            id="fullname-input" minLength="2" maxLength="40" required />
          <span className="popup__error" id="fullname-input-error" />
          <input type="text" className="popup__input popup__input_subtitle" name="about"
            id="subtitle-input" minLength="2" maxLength="200" required />
          <span className="popup__error" id="subtitle-input-error" />
          <button className="popup__submit popup__button_type_submit popup__button_type_info" type="submit">Сохранить</button>
          </>
        </PopupWithForm>
        <PopupWithForm name="image" title="Новое место" isOpen={isAddElementPopupOpen} onClose={closeAllPopup}>
          <>
          <input type="text" className="popup__input popup__input_name" name="name"
            placeholder="Название" id="image-name" minLength="1" maxLength="30" required />
          <span className="popup__error" id="image-name-error" />
          <input type="url" className="popup__input popup__input_image" name="link"
            placeholder="Ссылка на картинку" id="image-url" required />
          <span className="popup__error" id="image-url-error" />
          <button className="popup__submit popup__button_type_submit popup__button_type_element" type="submit">Сохранить</button>
          </>
        </PopupWithForm>       
        <ImagePopup card={selectedCard} onClose={closeAllPopup} />
        <Footer />
      </div>
    </div>
  )
}

export default App;
