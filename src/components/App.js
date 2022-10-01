import React from 'react';
import api from '../utils/api';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import avatarPath from '../images/profile__avatar.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({ name: 'Жак-Ив Кусто', about: 'Исследователь морей', avatar: avatarPath, id : '' });

  React.useEffect(() => {
      api.getUserData()
        .then((userData) => {
          setCurrentUser({name : userData.name, about : userData.about, avatar : userData.avatar, id : userData._id});
       })
       .catch((err) => {
        console.log(`Произошла ошибка при загрузки данных пользователя: ` + err);
       })},
  []);   

  React.useEffect(() => {
    api.getInitialCards()
     .then((initialCards) => {
        setCards(initialCards);
    })
    .catch((err) => {
     console.log(`Произошла ошибка при загрузки данных: ` + err);
    })},
[]);  

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {  
     setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(item) {
    setSelectedCard(item)
  }

  function closeAllPopups () {
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    (selectedCard != null) && setSelectedCard(null);          
  }
  
  function handleUpdateUser ({name, about}) {
    api.patchUserData({
      name,
      about})
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups ();
      })
      .catch((err) => {
        console.log(`Произошла ошибка при сохранении данных пользователя: ` + err);
       })
  }

  function handleUpdateAvatar (link){
    api.patchAvatar(link)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();

      })
      .catch((err) => {
        console.log(`Произошла ошибка при сохранении аватара пользователя: ` + err);
       })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser.id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
      .catch((err) => {
        console.log(`Произошла ошибка при изменении статуса лайка: ` + err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((err) => {
        console.log(`Произошла ошибка при удалении карточки: ` + err);
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.postNewCard({
      name: newCard.name,
      link: newCard.link
    })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Произошла ошибка при добавлении карточки: ` + err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
        <Main 
          onEditProfile = {handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete} />
        <Footer /> 
        
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 

        <AddPlacePopup isOpen={isAddPlacePopupOpen } onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 

        <PopupWithForm name="confirm" title="Вы уверенны?" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
    </CurrentUserContext.Provider>    
  );
}

export default App;
