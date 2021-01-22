import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header(props) {

  return(
    <header className="header">
      <img className="logo" alt="Логотип Mesto Russia" src={logo} />
      <Link to={props.link} className="header__link">{props.linkText}</Link>
    </header>
  )
}
