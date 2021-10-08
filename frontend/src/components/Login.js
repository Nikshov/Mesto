import SignForm from "./SignForm";

function Login({signIn}) {
  return (
    <SignForm
      titleText="Вход"
      buttonText="Войти"
      linkText="Нет аккаунта? Зарегестрироваться"
      apiRequest={signIn}
      path="/sign-up"
    />
  );
}

export default Login;
