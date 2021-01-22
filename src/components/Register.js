import React from 'react';
import Header from './Header'
import { Link } from 'react-router-dom';

export default function Register(props) {
  return(
    <>
      <Header linkText="Войти" link="/sign-in"/>
      <section className="page-form">
        <h2 className="page-form__title">Регистрация</h2>
        <form className="page-form__form">
        <div className="page-form__input-wrapper">
            <input id="email" className="page-form__form-item" type="url" placeholder="Email" name="link" required />
            <span id="email-error" className="popup__form-error"></span>
            <input id="password" className="page-form__form-item" type="url" placeholder="Пароль" name="link" required />
            <span id="password-error" className="popup__form-error"></span>
        </div>
        <div className="page-form__button-wrapper">
          <button className="page-form__button" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
          <p className="page-form__hint-message">Уже зарегистрированы? <Link to="/sign-in" className="page-form__hint-link">Войти</Link></p>
        </div>
        </form>
      </section>
    </>
  )
}
