import { initialCards } from "./initial-сards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editButton = document.querySelector('.profile__button_action_edit');
const addButton = document.querySelector('.profile__button_action_add');

const popupEditProfile = document.querySelector('#popupEdit'); //Попап редактррования профиля
const profCloseBtn = document.querySelector('#profCloseBtn'); //Кнопка закрытия профилья
const addCloseBtn = document.querySelector('#addCloseBtn'); //Кнопка закртия попапа добавления карточки
const previewCloseBtn = document.querySelector('#previewCloseBtn');
const userName = document.querySelector('.profile__name');
const inputName = document.querySelector('.popup__input_type_name'); //Поле имени
const userInfo = document.querySelector('.profile__about');
const inputInfo = document.querySelector('.popup__input_type_description'); //Поле описания ползователя

const popupElements = document.querySelectorAll('.popup'); // Попапы

const listElements = document.querySelector('.elements__list');
const likeBtn = document.querySelector('.element__like');

const popupAddCard = document.querySelector('#popupAdd');
const imgNameInput = document.querySelector('#place');
const imgSrcInput = document.querySelector('#link');
const elementBlock = document.querySelector('.elements__list');


const popupImage = document.querySelector('#imagePopup');
const bigImage = document.querySelector('.popup__image');
const formEditInfo = document.querySelector('#formEdit');//Форма редактирования
const formAddCard = document.querySelector('#formAdd'); //Форма добавления
const imgName = document.querySelector('.popup__input_type_place'); //Поле названия места
const imgSrc = document.querySelector('.popup__input_type_link'); //Поле ссылки на место



initialCards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();

    document.querySelector('.elements__list').append(cardElement);
    });

//Функция открывает форму и берет значения из профиля
function openEditProfilePopup() {
    enableValidation(config);
    openPopup(popupEditProfile);
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
    deleteErrors(popupEditProfile, config);
}

//Функция открывает форму добавления изображения
function openAddCardPopup() {
    openPopup(popupAddCard);
    deleteErrors(popupAddCard, config);
}

//Функция открытия формы
function openPopup(popup) {
    document.addEventListener('keydown', closePopupByClickOnEsc);
    popup.classList.add('popup_opened');
}
//Функция закрывает форму
function closePopup(evt) {
    document.removeEventListener('keydown', closePopupByClickOnEsc);
    evt.target.closest('.popup').classList.remove('popup_opened');
    formAddCard.reset();
}

//Функция закрытия формы кликом на оверлей
const closePopupByClickOnOverlay = function (evt) {
    if (evt.target !== evt.currentTarget) {
        return
    }
    closePopup(evt);
}

//Функция закрытия формы Esc
const closePopupByClickOnEsc = function (evt) {
    if (evt.key !== 'Escape') {
        return
    }
    const openedPopup = document.querySelector('.popup_opened .popup__close');
    closePopup({ target: openedPopup});
}



//Функция отправляет форму пользователя
function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    closePopup(evt);
}


function formSubmitHandlerAddCard(evt) {
    evt.preventDefault();
    const itemInfo = {
        name: imgName.value,
        link: imgSrc.value
    };
    deleteErrors(popupAddCard, config);
    renderCard(createCard(itemInfo), listElements);
    closePopup(evt);
    formAddCard.reset();
}



formEditInfo.addEventListener('submit', formSubmitHandler); //отправка формы Info
formAddCard.addEventListener('submit', formSubmitHandlerAddCard); //Отправка формы добавления
editButton.addEventListener('click', openEditProfilePopup); //открывает форму и заполняет инпуты
profCloseBtn.addEventListener('click', closePopup); // закрывает форму профиля
addCloseBtn.addEventListener('click', closePopup); // закрывает форму добавления картинки
addButton.addEventListener('click', openAddCardPopup); // открывает форму добавления изображения
previewCloseBtn.addEventListener('click', closePopup);
popupAddCard.addEventListener('click', closePopupByClickOnOverlay);
popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupImage.addEventListener('click', closePopupByClickOnOverlay);