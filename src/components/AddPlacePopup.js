import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const nameRef = React.useRef('');
  const linkRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value
    })
  }

  return (
    <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={props.isOpen}
          isLoading={props.isLoading}
          onClose={props.onClose}
          onSubmit={handleSubmit}>
            <input
              ref={nameRef}
              type="text"
              id="title-input"
              placeholder="Название"
              name="name"
              required
              className="input input_type_name"
              minLength="2"
              maxLength="30" />
            <span className='input-error title-input-error'></span>
            <input
              ref={linkRef}
              type="url"
              id="link-input"
              placeholder="Ссылка на картинку"
              name="link"
              required
              className="input input_type_about"/>
            <span className='input-error link-input-error'></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;