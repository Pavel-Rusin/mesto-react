import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddElementPopup from './AddElementPopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddElementPopupOpen, setIsAddElementPopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setIsDeletePopupOpen] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [card, setCard] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
    ])
        .then((values) => {
            const [userData, initialCards] = values
            setCurrentUser(userData)
            setCards([...initialCards])
        })
        .catch((err) => {
            console.log(err)
        })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  function handleCardDelete(card) {
    setIsDeletePopupOpen(true)
    setCard(card)
  }

  function handleDeletePopup() {
    setLoading(true)
    api.deleteCard(card._id)
        .then(() => {
          const newCards = cards.filter(c =>
            c !== card
          )
          setCards(newCards)
          closeAllPopup()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
  }

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
    setIsDeletePopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({ name, about }) {
    setLoading(true)
    api.patchUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopup()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true)
    api.patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopup()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handleAddElement({ name, link }) {
    setLoading(true)
    api.postNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopup()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  
  if (currentUser === null) {return false}
  else {
    return (
      <div className="page">
        <div className="root">
          <CurrentUserContext.Provider value={ currentUser }>
            <Header />
            <Main 
              onEditAvatar={ handleEditAvatarClick }
              onEditProfile={ handleEditProfileClick }
              onAddElement={ handleAddElementClick }
              onCardClick={ handleCardClick }
              cards={ cards }
              onCardDelete={ handleCardDelete }
              onCardLike={ handleCardLike }
            />
            <EditAvatarPopup 
              isOpen={ isEditAvatarPopupOpen }
              onClose={ closeAllPopup }
              onUpdateAvatar={ handleUpdateAvatar }
              isLoading={ isLoading }
            />
            <EditProfilePopup
              isOpen={ isEditProfilePopupOpen }
              onClose={ closeAllPopup }
              onUpdateUser={ handleUpdateUser }
              isLoading={ isLoading }
            />
            <AddElementPopup
              isOpen={ isAddElementPopupOpen }
              onClose={ closeAllPopup }
              onAddElement={ handleAddElement }
              isLoading={ isLoading }
            />
            <DeleteCardPopup 
              isOpen={ isConfirmPopupOpen }
              onClose={ closeAllPopup }
              isLoading={ isLoading }
              onSubmitClick={ handleDeletePopup }
            />      
            <ImagePopup 
              card={selectedCard} 
              onClose={closeAllPopup} 
            />
            <Footer />
          </CurrentUserContext.Provider>
        </div>
      </div>
    )
  }
}

export default App