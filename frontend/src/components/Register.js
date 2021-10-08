import SignForm from "./SignForm";

function Register({signUp}) {

  return (
    <SignForm
      titleText="Регистрация"
      buttonText="Зарегестрироваться"
      linkText="Уже зарегистрированы? Войти"
      apiRequest={signUp}
      path="/sign-in"
    />
  );
}

export default Register;
