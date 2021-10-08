import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({isSignUpSuccess, onClose, isOpen}) {
    return (
      <div className={`popup ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button
            onClick={onClose}
            type="button"
            className="popup__close-button"
            aria-label="кнопка закрыть"
          />
          <img
            className="popup__info-img" 
            src={isSignUpSuccess ? success : fail}
            alt=""
          />
          <p className="popup__info-text">
            {isSignUpSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    );
}

export default InfoTooltip;