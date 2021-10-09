import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ email, onSignOut }) {
  return (
    <header className='header'>
      <Link to='/'>
        <img className='logo' alt='логотип Mesto' src={logo} />
      </Link>
      <div className='header__container'>
        <Switch>
          <Route exact path='/sign-in'>
            <Link to='/sign-up' className='header__link'>
              Регистрация
            </Link>
          </Route>
          <Route exact path='/sign-up'>
            <Link to='/sign-in' className='header__link'>
              Войти
            </Link>
          </Route>
          <Route path='/'>
            <p className='header__email'>{email || 'email'}</p>
            <Link to='/sign-in' className='header__link' onClick={onSignOut}>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
