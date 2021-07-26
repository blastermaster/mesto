export default class Card {
    constructor (data, cardSelector){
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
         // забираем размеку из HTML и клонируем элемент
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
        // вернём DOM-элемент карточки
        return cardElement;
    }
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
         this._element = this._getTemplate();

         this._setEventListeners();
        // Добавим данные
         this._element.querySelector('.element__image').src = this._link;
         this._element.querySelector('.element__title').textContent = this._name;
        // Вернём элемент наружу
        console.log(this._element);
         return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._handleDeleteClick();
        })
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleOpenPreview();
        })
    }
    //Тоггл лайка
    _handleLikeClick() {
        this._element.querySelector('.element__like')
        .classList
        .toggle('element__like_liked');
    }
    //Удаление карточки
    _handleDeleteClick() {
        this._element.querySelector('.element__delete')
        .closest('.element')
        .remove();
    }
    //Открытие превью после нажатия на карточку  
    _handleOpenPreview() {
        document.querySelector('.popup__image').src = this._link;
        document.querySelector('.popup__image').alt = this._name;
        document.querySelector('.popup__image-title').textContent = this._name;
        document.querySelector('#imagePopup').classList.add('popup_opened');
    }
}

