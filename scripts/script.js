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

//Ф-ция перебора
initialCards.forEach(function (element) {
    renderCard(createCard(element), listElements);
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
function renderCard(card, container) {
    container.prepend(card);
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
    popup.classList.add('popup_opened');
}
//Функция закрывает форму
function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
    formAddCard.reset();
}

//Функция закрытия формы кликом на оверлей
const closePopupByClickOnOverlay = function (evt) {
    if (evt.target != evt.currentTarget) {
        return
    }
    closePopup(evt);
}

//Функция закрытия формы Esc
const closePopupByClickOnEsc = function (evt) {
    if (evt.key !== 'Escape') {
        return
    }
    closePopup(evt);
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
    // setSubmitButtonInactive( )
    closePopup(evt);
    formAddCard.reset();
}
//Функция открывает попап большой картинки
function openPopupPreview(evt) {
    const previewImg = document.querySelector('.popup__image');
    const previewText = document.querySelector('.popup__image-title');

    previewImg.src = evt.target.src;
    previewText.textContent = evt.target.alt;

    openPopup(popupImage);

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

document.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
        closePopup({ target: document.querySelector('.popup_opened .popup__close') });
    }
});