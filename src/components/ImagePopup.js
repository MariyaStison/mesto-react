function ImagePopup(props) {
  
  if (props.card != null) {
   
  return (
    <div className='popup popup_type_view popup_opened'>
      <div className="popup__container-view">
        <button type="button" className="btn btn_type_close btn_type_close-view" aria-label="Закрыть" onClick={props.onClose} />
        <img src={props.card.link} className="popup__img" alt={props.card.name} />
        <h2 className="popup__img-title">{props.card.name}</h2>
      </div>
    </div>
  )
  } else {
    return
  }
}

export default ImagePopup;