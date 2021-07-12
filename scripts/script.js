const editButton = document.querySelector('.profile__button_action_edit');
const popupEditProfile = document.querySelector('#popupEdit');
const profCloseBtn = document.querySelector('#profCloseBtn');
const addCloseBtn = document.querySelector('#addCloseBtn');
const previewCloseBtn = document.querySelector('#previewCloseBtn');
const userName = document.querySelector('.profile__name');
const inputName = document.querySelector('.change-form__input_name_value');
const userInfo = document.querySelector('.profile__about');
const inputInfo = document.querySelector('.change-form__input_info_value');

const popupElements = document.querySelectorAll('.popup');

const listElements = document.querySelector('.elements__list');
const likeBtn = document.querySelector('.element__like');
const addButton = document.querySelector('.profile__button_action_add');
const popupAddCard = document.querySelector('#popupAdd');
const imgNameInput = document.querySelector('#imgName');
const imgSrcInput = document.querySelector('#imgSrc');
const elementBlock = document.querySelector('.elements__list');


const popupImage = document.querySelector('#imagePopup');
const bigImage = document.querySelector('.popup__image');
const formEditInfo = document.querySelector('#formEdit');
const formAddCard = document.querySelector('#formAdd');
const imgName = document.querySelector('.change-form__input_text_value');
const imgSrc = document.querySelector('.change-form__input_src_value');



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

//Функция закрытия формы кликом на оверлей
const closePopupByClickOnOverlay = function (evt) {
    if (evt.target != evt.currentTarget) {
        return
    }
    closePopup(evt);

}

const closePopupByClickOnEsc = function (evt) {
    console.log(evt);
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
    renderCard(createCard(itemInfo), listElements);
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
document.addEventListener('keydown', closePopupByClickOnEsc);