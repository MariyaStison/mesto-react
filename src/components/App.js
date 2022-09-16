import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
  
  return (
    
    <div className="page">
      <Header />
        <Main onEditProfile = {handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer /> 
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen = {isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input type="text" id="name-input" placeholder="Имя" name="name" required className="input input_type_name" minLength="2" maxLength="40" />
          <span className='input-error name-input-error'></span>
          <input type="text" id="about-input" placeholder="О себе" name="about" className="input input_type_about" required minLength="2" maxLength="200" />
          <span className='input-error about-input-error'></span>
        </PopupWithForm>
        <PopupWithForm name="add" title="Новое место" isOpen = {isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input type="text" id="title-input" placeholder="Название" name="name" required className="input input_type_name" minLength="2" maxLength="30" />
          <span className='input-error title-input-error'></span>
          <input type="url" id="link-input" placeholder="Ссылка на картинку" name="link" required className="input input_type_about"/>
          <span className='input-error link-input-error'></span>
        </PopupWithForm>
        <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen = {isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input type="url" id="avatar-link-input" placeholder="Ссылка на новый аватар" name="link" required className="input input_type_name" /> 
          <span className='input-error avatar-link-input-error'></span> 
        </PopupWithForm>
        <PopupWithForm name="confirm" title="Вы уверенны?" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>    
  );
}

export default App;
