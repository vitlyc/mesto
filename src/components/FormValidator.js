export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._config = config;
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;
        this._errorElement.classList.add(this._config.errorClass);
    }

    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        this._errorElement.classList.remove(this._config.errorClass);
        this._errorElement.textContent = '';
    }



    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._blockButton();
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled', true)
        }
    }

    _blockButton() {
        this._buttonElement.setAttribute('disabled', true)
    }
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {

                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._blockButton();
        });

        this._setEventListeners();
    };

};