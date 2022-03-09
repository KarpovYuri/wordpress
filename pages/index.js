const button = document.querySelectorAll('.button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');


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
  item.addEventListener('click', openPopup);
});


// Закрытие popup'a по крестику
closeButton.addEventListener('click', closePopup);


// Закрытие popup'a по overlay
popup.addEventListener('mousedown', (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
});
