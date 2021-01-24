import React from 'react';
import Header from './Header'
import { Link, useHistory } from 'react-router-dom';
import authApi from '../utils/AuthApi';

export default function Register(props) {
  const history = useHistory();
  const signUpHandler = props.signUpHandler;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      "password": password,
      "email": email
    }
    authApi.signUpUser(data)
    .then((back) => {
      history.push('/sign-in')
      console.log(back)
    })
    .catch((err) => { console.log(err)} )
  }

  return(
    <>
      <Header linkText="Войти" link="/sign-in"/>
      <section className="page-form">
        <h2 className="page-form__title">Регистрация</h2>
        <form className="page-form__form"  onSubmit={(e) => {handleSubmit(e)}}>
        <div className="page-form__input-wrapper">
            <input
            id="email"
            className="page-form__form-item"
            type="email" placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required />
            <span id="email-error" className="popup__form-error"></span>
            <input
            id="password"
            className="page-form__form-item"
            type="password"
            placeholder="Пароль"
            name="password"
            minLength="4"
            onChange={(e) => setPassword(e.target.value)}
            required />
            <span id="password-error" className="popup__form-error"></span>
        </div>
        <div className="page-form__button-wrapper">
          <button
          className="page-form__button"
          type="submit"
          aria-label="Зарегистрироваться"
          >Зарегистрироваться</button>
          <p className="page-form__hint-message">Уже зарегистрированы? <Link to="/sign-in" className="page-form__hint-link">Войти</Link></p>
        </div>
        </form>
      </section>
    </>
  )
}
