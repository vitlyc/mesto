function enableValidation({ formSelector, ...config }) {

    const formList = Array.from(document.querySelectorAll(formSelector))
    formList.forEach(function(formElement) {
        setEventListener(formElement, { formSelector, ...config })
    })
}


function setEventListener(formElement, { formSelector, ...config }) {

    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault()
    })

    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function(event) {

            checkInputValidity(inputElement, { formSelector, ...config })
            toggleButtonActivity(buttonElement, inputList)
        })
    })
    toggleButtonActivity(buttonElement, inputList)
}


function checkInputValidity(inputElement, { formSelector, ...config }) {
    const isInputValid = inputElement.validity.valid


    if (isInputValid) {
        hideInputError(inputElement, { formSelector, ...config })
    } else {
        const errorMessage = inputElement.validationMessage
        showInputError(inputElement, errorMessage, { formSelector, ...config })
    }
}

function showInputError(inputElement, errorMessage, { formSelector, ...config }) {
    const parrentForm = inputElement.closest(formSelector)
    const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(config.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(config.errorClass)

}

function hideInputError(inputElement, { formSelector, ...config }) {
    const parrentForm = inputElement.closest(formSelector)
    const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(config.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(config.errorClass)

}

function toggleButtonActivity(buttonElement, inputList) {

    const hasNotValidInput = inputList.some(function(inputElement) {
        return !inputElement.validity.valid
    })

    if (hasNotValidInput) {
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.removeAttribute('disabled', true)

    }
}

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_error',
    errorClass: 'popup__error_visible'
});