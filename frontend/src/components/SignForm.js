import React from 'react';
import { Link } from 'react-router-dom';

function SignForm({ titleText, buttonText, linkText, apiRequest, path }) {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    apiRequest({ password, email });
  }

  return (
    <form name='sign-in' className='sign' autoComplete='on' onSubmit={handleSubmit}>
      <h1 className='sign__title'>{titleText}</h1>
      <input
        type='email'
        id='email-signin'
        name='signInEmail'
        className='sign__input'
        placeholder='Email'
        minLength={5}
        maxLength={200}
        required
        value={email}
        onChange={handleEmailChange}
      />
      <span className='sign__input-error'></span>
      <input
        onChange={handlePasswordChange}
        value={password}
        type='password'
        id='password-signin'
        name='signInPass'
        className='sign__input'
        placeholder='Пароль'
        minLength={6}
        maxLength={200}
        required
      />
      <span className='sign__input-error'></span>
      <button type='submit' className='sign__button' aria-label='кнопка отправки формы'>
        {buttonText}
      </button>
      <Link to={path} className='sign__link'>
        {linkText}
      </Link>
    </form>
  );
}

export default SignForm;
