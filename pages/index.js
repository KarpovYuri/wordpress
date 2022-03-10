import { FormValidator } from "../js/FormValidator.js";

const button = document.querySelectorAll('.button');
const formPopup = document.querySelector('#formPopup');
const closeButton = formPopup.querySelector('.popup__close-button');
const form = formPopup.querySelector('.popup__form');
const nameInput = formPopup.querySelector('#nameInput');
const phoneInput = formPopup.querySelector('#phoneInput');
const messagePopup = document.querySelector('#messagePopup');


// Объект классов необходимый для запуса валидации
const formClasses = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__input-error_active',
};


// Создание экземпляра классa валидации
const Validator = new FormValidator(formClasses, formPopup);


// Закрытие popup'ов по нажатию Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(formPopup);
  }
}


// Закрытия popup'a
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Удаляем обработчик 'Esc' при закрытии
  if (popup.id === 'formPopup') {
    document.removeEventListener('keydown', closeByEsc);
  }
}


// Открытие popup'a
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // Установка обработчика событий на 'Esc' при открытии popup'a
  if (popup.id === 'formPopup') {
    document.addEventListener('keydown', closeByEsc);
  }
}


// Установка обработчиков на кнопки 'Записаться на интенсив'
button.forEach((item) => {
  item.addEventListener('click', () => {
    if (nameInput.value === '' && phoneInput.value === '') {
      Validator.resetFormError();
      Validator.toggleButtonState();
    }
    openPopup(formPopup);
  });
});


// Закрытие popup'a по крестику
closeButton.addEventListener('click', () => {
  closePopup(formPopup);
}
);


// Закрытие popup'a по overlay
formPopup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(formPopup);
  }
});


// Обработчик событий формы
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  closePopup(formPopup);
  evt.target.reset();
  setTimeout(() => {
    openPopup(messagePopup);
    setTimeout(() => closePopup(messagePopup), 1400);
  }, 150);
});


// Запуск валидации
Validator.enableValidation();
