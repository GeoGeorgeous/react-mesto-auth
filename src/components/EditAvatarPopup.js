import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  submitButtonText,
  loadingText,
  isLoading}) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}
      loadingText={loadingText}
      isLoading={isLoading}
      children={(
        <>
                <div className="popup__form-item-group">
                  <input ref={avatarRef} id="link" className="popup__form-item popup__form-item_input_name" type="url" placeholder="Ссылка на картинку" name="link" required />
                  <span id="link-error" className="popup__form-error"></span>
                </div>
            </>
      )}
  />)
}
