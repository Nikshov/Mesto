import SignForm from './SignForm';

function Register({ signUp }) {
  return (
    <SignForm
      titleText='Регистрация'
      buttonText='Зарегистрироваться'
      linkText='Уже зарегистрированы? Войти'
      apiRequest={signUp}
      path='/sign-in'
    />
  );
}

export default Register;
