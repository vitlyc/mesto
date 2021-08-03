class FormValidator {
    constructor(config, formElement) {
        this._config = config
        this._formElement = formElement
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector)
    }
    enableValidation() {
        this._setEventListener()
    }
    _setEventListener() {
        this._formElement.addEventListener('submit', function(evt) {
            evt.preventDefault()
        })
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this.toggleButtonActivity()
            })
        })
        this.toggleButtonActivity()
    }
    _checkInputValidity(inputElement) {
        const isInputValid = inputElement.validity.valid
        if (isInputValid) {
            this._hideInputError(inputElement)
        } else {
            const errorMessage = inputElement.validationMessage
            this._showInputError(inputElement, errorMessage)
        }
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._config.inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._config.errorClass)
    }
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._config.inputErrorClass)
        errorElement.textContent = ''
        errorElement.classList.remove(this._config.errorClass)
    }
    toggleButtonActivity() {
        if (this._checkInvalidInput()) {
            this._buttonElement.setAttribute('disabled', true)
        } else {
            this._buttonElement.removeAttribute('disabled', true)
        }
    }
    _checkInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

}


export { FormValidator }