function Card(props) {
    
  function handleClick() {
    props.onCardClick(props.item);
  }  

  return (
    <li className="elemnt">
        <img src={props.item.link} className="elemnt__img" alt={props.item.name} onClick={handleClick} />
        <button type="button" className="btn btn_type_delete" aria-label="Удалить" />
        <div className="elemnt__bottom-site">
          <h2 className="elemnt__title">{props.item.name}</h2>
          <div className="elemnt__like-block"> 
            <button type="button" className="btn btn_type_like" aria-label="Поставить Лайк" />
            <div className="elemnt__like-counter">{props.item.likes.length}</div>
           </div>
        </div>
    </li>
  )
}

export default Card;