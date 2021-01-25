import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header(props) {
  const history = useHistory();
  const {
    link, linkText, email, loggedIn,
  } = props;
  const showClass = loggedIn ? 'header__email_show ' : '';
  const greyClass = loggedIn ? 'header__link_color_grey ' : '';

  function handleLogOut() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      history.push('/login');
    }
  }

  return (
    <header className="header">
      <img className="logo" alt="Логотип Mesto Russia" src={logo} />
      <p className={`header__email ${showClass}`}>{ email }</p>
      <Link
        to={link}
        className={`header__link ${greyClass}`}
        onClick={handleLogOut}
      >
        {linkText}
      </Link>
    </header>
  );
}
