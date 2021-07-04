let editButton = document.querySelector('.profile__button_action_edit');
let popupEditProfile = document.querySelector('#popupEdit');
const profCloseBtn = document.querySelector('#profCloseBtn');
const addCloseBtn = document.querySelector('#addCloseBtn');
const previewCloseBtn = document.querySelector('#previewCloseBtn');
let userName = document.querySelector('.profile__name');
let inputName = document.querySelector('.change-form__input_name_value');
let userInfo = document.querySelector('.profile__about');
let inputInfo = document.querySelector('.change-form__input_info_value');

const listElements = document.querySelector('.elements__list');
const likeBtn = document.querySelector('.element__like');
const addButton = document.querySelector('.profile__button_action_add');
const popupAddCard = document.querySelector('#popupAdd');
const imgNameInput = document.querySelector('#imgName');
const imgSrcIngut = document.querySelector('#imgSrc');
const elementBlock = document.querySelector('.elements__list');


const popupImage = document.querySelector('#imagePopup');
const bigImage = document.querySelector('.popup__image');
const formEditInfo = document.querySelector('#formEdit');
const formAddCard = document.querySelector('#formAdd');
const imgName = document.querySelector('.change-form__input_text_value');
const imgSrc = document.querySelector('.change-form__input_src_value');
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


//Ф-ция перебора
initialCards.forEach(function(element){
renderCard(createCard(element));
})

//Ф-ция создания карточки
function createCard(element) {
    const itemTemplateContent = document.querySelector('#element-template').content;
    const itemsElement = itemTemplateContent.cloneNode(true);
    const elementImage = itemsElement.querySelector('.element__image');
    elementImage.src = element.link;
    elementImage.alt = element.name;
    itemsElement.querySelector('.element__title').textContent = element.name;
    itemsElement.querySelector('.element__like').addEventListener('click', liked);
    itemsElement.querySelector('.element__delete').addEventListener('click', deleteElement);
    elementImage.addEventListener('click', openPopupPreview);
    return itemsElement;
}

//Ф-ция рендера карточки
function renderCard(card) {
    const listElements = document.querySelector('.elements__list');
    listElements.prepend(card);
}


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
function formSubmitHandlerAddCard(evt) {
    evt.preventDefault();
    const itemInfo = {
        name: imgName.value,
        link: imgSrc.value
    }; 
    renderCard(createCard(itemInfo));
    closePopup(evt);
    formAddCard.reset();
}

function openPopupPreview(evt) {
    const previewImg = document.querySelector('.popup__image');
    const previwText = document.querySelector('.popup__image-title');

    previewImg.src = evt.target.src;
    previwText.textContent = evt.target.alt;

    openPopup(popupImage);

}


formEditInfo.addEventListener('submit', formSubmitHandler); //отправка формы Info
formAddCard.addEventListener('submit', formSubmitHandlerAddCard); //Отправка формы добавления
editButton.addEventListener('click', openEditProfilePopup); //открывает форму и заполняет инпуты
profCloseBtn.addEventListener('click', closePopup); // закрывает форму профиля
addCloseBtn.addEventListener('click', closePopup); // закрывает форму добавления картинки
addButton.addEventListener('click', openAddCardPopup); // открывает форму добавления изображения
previewCloseBtn.addEventListener('click', closePopup);

