import Popup from './Popup.js';

import { config } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._popup = super.givePopup();
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll(config.inputSelector));
        this._formElement = this._popup.querySelector('.popup__container')
    }
    close() {
        super.close();
        this._formElement.reset();

    }
    open() {
        super.open();
    }
    _getInputValues() {
        this._formInputValues = {};
        this._inputList.forEach((input) => {
            this._formInputValues[input.name] = input.value
                // console.log(input.value);
        });
        return this._formInputValues;
    }

    setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
        this._popup.querySelector('.popup__container').reset();
        super.setEventListeners();
    }

};