import SignForm from './SignForm';

function Login({ signIn }) {
  return (
    <SignForm
      titleText='Вход'
      buttonText='Войти'
      linkText='Нет аккаунта? Зарегистрироваться'
      apiRequest={signIn}
      path='/sign-up'
    />
  );
}

export default Login;
