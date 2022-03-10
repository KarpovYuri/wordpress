import { FormValidator } from "../js/FormValidator.js";

const button = document.querySelectorAll('.button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const form = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('#nameInput');
const phoneInput = popup.querySelector('#phoneInput');


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
const Validator = new FormValidator(formClasses, popup);


// Закрытие popup'ов по нажатию Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}


// Закрытия popup'a
function closePopup() {
  popup.classList.remove('popup_opened');
  // Удаляем обработчик 'Esc' при закрытии
  document.removeEventListener('keydown', closeByEsc);
}


// Открытие popup'a
function openPopup() {
  popup.classList.add('popup_opened');
  // Установка обработчика событий на 'Esc' при открытии popup'a
  document.addEventListener('keydown', closeByEsc);
}


// Установка обработчиков на кнопки 'Записаться на интенсив'
button.forEach((item) => {
  item.addEventListener('click', () => {
    if (nameInput.value === '' && phoneInput.value === '') {
      Validator.resetFormError();
      Validator.toggleButtonState();
    }
    openPopup();
  });
});


// Закрытие popup'a по крестику
closeButton.addEventListener('click', closePopup);


// Закрытие popup'a по overlay
popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
});


// Обработчик событий формы
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  closePopup();
  evt.target.reset();
});


// Запуск валидации
Validator.enableValidation();
