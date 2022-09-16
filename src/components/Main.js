import React from 'react';
import api from '../utils/api';
import Card from './Card';
import avatarPath from '../images/profile__avatar.jpg';


function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(avatarPath);
  const [cards, setCards] = React.useState([]);   
  
  React.useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setUserName(userData.name);
          setUserDescription(userData.about);
          setUserAvatar(userData.avatar);
          setCards(initialCards);
       })
       .catch((err) => {
        console.log(`Произошла ошибка при загрузки данных: ` + err);
       })},
  []);  

  return (
    <main className="main"> 
      <section className="profile">
        <div className="profile__content">
          <img src={userAvatar} alt="Аватарка" className="profile__avatar" />
          <button type="button" className="btn btn_type_edit-avatar" aria-label="Обновить аватар" onClick={props.onEditAvatar}></button>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button type="button" className="btn btn_type_edit" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="btn btn_type_add" aria-label="Добавить" onClick={props.onAddPlace}></button>       
      </section> 
      <section>
        <ul className="elemets">
          {cards.map((card) => {
            return (
              <Card item={card} key={card._id} onCardClick={props.onCardClick}/>
            )
          })}
        </ul>
      </section> 
   </main>
  )
}

export default Main;