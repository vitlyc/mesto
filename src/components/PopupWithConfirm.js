import Popup from './Popup.js'

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleDeleteCard }) {
        super(popupSelector);
        this._handleDeleteButton = handleDeleteCard;
        this._deleteCardButton = this._popup.querySelector('.popup__save-button');
    }
    open() {
        this._setEventListeners();
        super.open();
    }
    _agreeDelete = (evt) => {

        // console.log(this._handleEscClose);
        this._handleDeleteButton();
        evt.preventDefault()

    }
    _setEventListeners() {

        super._setEventListeners();
        this._deleteCardButton.addEventListener('click', this._agreeDelete);
    }

}