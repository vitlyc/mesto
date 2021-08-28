export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeOnClick = this._closeOnClick.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }
    givePopup() {
        return this._popup;
    }
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeOnClick = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    _handleButtonClose = () => {
        this.close();
    }

    _setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._closeOnClick);
        this._closeButton.addEventListener('click', this._handleButtonClose);
    }

    _removeEventListeners() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._closeOnClick);
        this._closeButton.removeEventListener('click', this._handleButtonClose);
    }
}