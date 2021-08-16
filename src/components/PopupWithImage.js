import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = super.givePopup();
    }

    open(name, link) {
        super.open();
        this._popup.querySelector('.popup__title').textContent = name;
        this._popup.querySelector('.popup__image').src = link;
        this._popup.querySelector('.popup__image').alt = name;
    }

};