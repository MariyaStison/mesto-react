function PopupWithForm(props) {
    const className = `popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`;
    
    return (
      <div className={className}>
        <div className="popup__container">
          <button
            type="button"
            className="btn btn_type_close"
            aria-label="Закрыть"
            onClick={props.onClose} />
          <h2 className="popup__title">{props.title}</h2>
          <form
            name={props.name}
            className="popup__form"
            noValidate
            onSubmit={props.onSubmit}>
            {props.children}
            {props.isLoading ? (
              <input
              type="submit"
              value="Сохранение..."
              className="btn btn_type_submit" />
            ) : (
              <input
              type="submit"
              value="Сохранить"
              className="btn btn_type_submit" />
            )}
          </form>
        </div>
      </div>
    )  
  }


export default PopupWithForm;