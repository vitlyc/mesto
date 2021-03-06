import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._popup = super.givePopup();
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__container');
        this._inputList = this._form.querySelectorAll('.popup__text');
    }

    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    _submitForm = (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        // this.close();
    }

    _setEventListeners() {
        super._setEventListeners();
        this._form.addEventListener('submit', this._submitForm);
    }

    _removeEventListeners() {
        super._removeEventListeners();
        this._form.removeEventListener('submit', this._submitForm);
    }

    close() {
        super.close();
        this._form.reset();
    }
}