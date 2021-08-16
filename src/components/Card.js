export default class Card {

    constructor({ data, handleCardClick }, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._handleCardClick = handleCardClick;
        this._link = data.link;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
    }

    _toggleHeart(evt) {
        evt.target.classList.toggle('element__heart_active')
    }

    _setEventListeners() {
        const cardHeart = this._element.querySelector('.element__heart');
        const cardRemoveButton = this._element.querySelector('.element__remove-button');
        const elementPopupImage = this._element.querySelector('.element__image');

        cardHeart.addEventListener('click', (evt) => {
            this._toggleHeart(evt);
        });

        cardRemoveButton.addEventListener('click', () => {
            this._removeCard();
        });

        elementPopupImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}