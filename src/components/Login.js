import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';
import api from '../utils/Api';

export default function Login(props) {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    api.authorize(email, password)
      .then((res) => {
        if (res) {
          setEmail('');
          setPassword('');
          props.handleLogin();
          history.push('/');
        }
      })
      .catch((err) => { console.log(err); });
  }

  return (
    <>
      <Header linkText="Регистрация" link="/sign-up" />
      <section className="page-form">
        <h2 className="page-form__title">Вход</h2>
        <form className="page-form__form" onSubmit={(e) => { handleSubmit(e); }}>
          <div className="page-form__input-wrapper">
            <input
              id="email"
              className="page-form__form-item"
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span id="email-error" className="popup__form-error" />
            <input
              id="password"
              className="page-form__form-item"
              type="password"
              placeholder="Пароль"
              name="password"
              minLength="4"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span id="password-error" className="popup__form-error" />
          </div>
          <div className="page-form__button-wrapper">
            <button className="page-form__button" type="submit" aria-label="Зарегистрироваться">Войти</button>
          </div>
        </form>
      </section>
    </>
  );
}
