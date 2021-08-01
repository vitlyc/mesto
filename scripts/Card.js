import { openPopup, setPopupListener, pictureImage, titleImage, popupImage } from './index.js'

export const initialCards = [{
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

export class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name
        this._link = data.link
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link
        this._element.querySelector('.element__title').textContent = this._name
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__remove-button').addEventListener('click', this._removeCard)
        this._element.querySelector('.element__heart').addEventListener('click', this._toggleHeart)
        this._element.querySelector('.element__image').addEventListener('click', this._displayImagePopup)
    }
    _removeCard(event) {
        event.target.closest('.element').remove()
    }
    _toggleHeart(event) {
        event.target.classList.toggle('element__heart_active')
    }

    _displayImagePopup(evt) {
        const targetImage = evt.target
        pictureImage.src = targetImage.src
        pictureImage.alt = targetImage.alt
        titleImage.textContent = targetImage.alt
        openPopup(popupImage)
        setPopupListener(popupImage)
    }

}