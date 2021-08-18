import {
    escapeCode,
} from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);

    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose.bind(this));
        document.addEventListener('click', this._closeOnClick.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose.bind(this));
        document.removeEventListener('click', this._closeOnClick.bind(this));
    }
    givePopup() {
        return this._popup;
    }
    _handleEscClose(evt) {
        if (evt.keyCode == escapeCode) {
            this.close();
        }
    }
    _closeOnClick(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }
    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');

        closeButton.addEventListener('click', () => {
            this.close();
        });
    }

};