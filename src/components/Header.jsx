import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Header(props) {
  const { link, linkText } = props;
  return (
    <header className="header">
      <img className="logo" alt="Логотип Mesto Russia" src={logo} />
      <Link to={link} className="header__link">{linkText}</Link>
    </header>
  );
}
