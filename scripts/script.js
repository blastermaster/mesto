const openPopupButton = document.querySelector('.profile__button_action_edit');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-btn')
let userName = document.querySelector('.profile__name')
let inputName = document.querySelector('.change-form__input_name_value');
let userInfo = document.querySelector('.profile__about')
let inputInfo = document.querySelector('.change-form__input_info_value');
let formElement = document.querySelector('.change-form')


function togglePopup(event) {
    popup.classList.toggle('popup__opened');
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
}

openPopupButton.addEventListener('click', togglePopup)
closePopupButton.addEventListener('click', togglePopup)


function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    togglePopup();
}

formElement.addEventListener('submit', formSubmitHandler);