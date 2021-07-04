let editButton = document.querySelector('.profile__button_action_edit');
let popupEditProfile = document.querySelector('#popupEdit');
const profCloseBtn = document.querySelector('#profCloseBtn');
const addCloseBtn = document.querySelector('#addCloseBtn');
let userName = document.querySelector('.profile__name');
let inputName = document.querySelector('.change-form__input_name_value');
let userInfo = document.querySelector('.profile__about');
let inputInfo = document.querySelector('.change-form__input_info_value');
let formElement = document.querySelector('.change-form');
const listElements = document.querySelector('.elements__list');
const likeBtn = document.querySelector('.element__like');
const addButton = document.querySelector('.profile__button_action_add');
const popupAddCard = document.querySelector('#popupAdd');
const imgNameInput = document.querySelector('#imgName');
const imgSrcIngut = document.querySelector('#imgSrc');
const elementBlock = document.querySelector('.elements__list');
const formAddCard = document.querySelector('#formAdd');

const popupImage = document.querySelector('#imagePopup');
const bigImage = document.querySelector('.popup__image');

// Массив карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



//Функция рендера карточек на странице
initialCards.forEach(function (element) {
    const listElements = document.querySelector('.elements__list');
    const itemTemplateContent = document.querySelector('#element-template').content;
    const itemsElement = itemTemplateContent.cloneNode(true);
    itemsElement.querySelector('.element__image').src = element.link;
    itemsElement.querySelector('.element__image').alt = element.name;
    itemsElement.querySelector('.element__title').textContent = element.name;
    itemsElement.querySelector('.element__like').addEventListener('click', liked);
    itemsElement.querySelector('.element__delete').addEventListener('click', deleteElement);
    listElements.append(itemsElement);
});

//Функция ставил или убирает лайк
function liked(evt) {
    evt.target.classList.toggle('element__like_liked')
}
//Функция удаляет карточку
function deleteElement(evt) {
    evt.target.closest('.element').remove();
}
//Функция открывает форму и берет значения из профиля
function openEditProfilePopup() {
    openPopup(popupEditProfile);
    inputName.value = userName.textContent;
    inputInfo.value = userInfo.textContent;
}

//Функция открывает форму добавления изображения
function openAddCardPopup() {
    openPopup(popupAddCard);

}

//Функция открытия формы
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
//Функция закрывает форму
function closePopup(evt) {

    console.log(evt.target);
    console.log(evt.target.closest('.popup'));
    evt.target.closest('.popup').classList.remove('popup_opened');
}

//Функция отправляет форму пользователя
function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = inputName.value;
    userInfo.textContent = inputInfo.value;
    closePopup(evt);
}

//Функция открывает попап большой картинки





formElement.addEventListener('submit', formSubmitHandler); //отправка формы
editButton.addEventListener('click', openEditProfilePopup); //открывает форму и заполняет инпуты
profCloseBtn.addEventListener('click', closePopup); // закрывает форму профиля
addCloseBtn.addEventListener('click', closePopup); // закрывает форму добавления картинки
addButton.addEventListener('click', openAddCardPopup); // открывает форму добавления изображения
