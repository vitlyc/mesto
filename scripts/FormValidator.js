const config = {
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__error_visible'
}

class FormValidator {
    constructor(config, formElement) {
        this._config = config
        this._formElement = formElement
    }
    enableValidation() {
        this._setEventListener()
    }
    _setEventListener() {
        this._formElement.addEventListener('submit', function(evt) {
            evt.preventDefault()
        })
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector)
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonActivity(buttonElement, inputList)
            })
        })
        this._toggleButtonActivity(buttonElement, inputList)
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
        const parrentForm = inputElement.closest(this._config.formSelector)
        const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._config.inputErrorClass)
        errorElement.textContent = errorMessage
        errorElement.classList.add(this._config.errorClass)
    }
    _hideInputError(inputElement) {
        const parrentForm = inputElement.closest(this._config.formSelector)
        const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._config.inputErrorClass)
        errorElement.textContent = ''
        errorElement.classList.remove(this._config.errorClass)
    }
    _toggleButtonActivity(buttonElement, inputList) {

        const hasNotValidInput = inputList.some(function(inputElement) {
            return !inputElement.validity.valid
        })

        if (hasNotValidInput) {
            buttonElement.setAttribute('disabled', true)
        } else {
            buttonElement.removeAttribute('disabled', true)

        }
    }
}


export { FormValidator, config }