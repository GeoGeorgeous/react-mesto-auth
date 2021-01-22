import React from 'react';
import Header from './Header'

export default function Login(props) {
  return(
    <>
      <Header linkText="Регистрация" link="/sign-up" />
      <section className="page-form">
        <h2 className="page-form__title">Вход</h2>
        <form className="page-form__form">
        <div className="page-form__input-wrapper">
            <input id="email" className="page-form__form-item" type="url" placeholder="Email" name="link" required />
            <span id="email-error" className="popup__form-error"></span>
            <input id="password" className="page-form__form-item" type="url" placeholder="Пароль" name="link" required />
            <span id="password-error" className="popup__form-error"></span>
          </div>
          <div className="page-form__button-wrapper">
            <button className="page-form__button" type="submit" aria-label="Зарегистрироваться">Войти</button>
          </div>
        </form>
      </section>
    </>
  )
}
