import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = super.givePopup();
        this._popupTitle = this._popup.querySelector('.popup__title')
        this._popupImage = this._popup.querySelector('.popup__image')
    }

    open(name, link) {
        this._popupTitle.textContent = name;
        this._popupImage.src = link;
        this._popupImage.alt = name;
        super.open();
    }
}