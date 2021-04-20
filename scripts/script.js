let openPopupButton = document.querySelector('.profile__button_action_edit');
let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close-btn')
let userName = document.querySelector('.profile__name')
let inputName = document.querySelector('.change-form__input_name_value');
let userInfo = document.querySelector('.profile__about')
let inputInfo = document.querySelector('.change-form__input_info_value');
let formElement = document.querySelector('.change-form')


//Функция открывает форму и берет значения из профиля
function popupOpen() {
    popup.classList.add('popup_opened');
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
}
//Функция закрывает форму
function popupClose() {
    popup.classList.remove('popup_opened')
}



//Функция отправляет форму
function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    popupClose();
}


formElement.addEventListener('submit', formSubmitHandler); //отправка формы
openPopupButton.addEventListener('click', popupOpen); //открывает форму и заполняет инпуты
closePopupButton.addEventListener('click', popupClose); // закрывает форму