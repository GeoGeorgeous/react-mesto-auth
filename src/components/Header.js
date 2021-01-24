import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header(props) {
  const {
    link, linkText, email, loggedIn,
  } = props;
  const showClass = loggedIn ? 'header__email_show ' : '';
  const greyClass = loggedIn ? 'header__link_color_grey ' : '';

  return (
    <header className="header">
      <img className="logo" alt="Логотип Mesto Russia" src={logo} />
      <p className={`header__email ${showClass}`}>{ email }</p>
      <Link to={link} className={`header__link ${greyClass}`}>{linkText}</Link>
    </header>
  );
}
