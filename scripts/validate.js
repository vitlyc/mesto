function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__container'))
    formList.forEach(function(formElement) {
        setEventListener(formElement)
    })
}

function setEventListener(formElement) {
    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault()
    })
    const inputList = Array.from(formElement.querySelectorAll('.popup__text'))
    const buttonElement = formElement.querySelector('.popup__save-button')
    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function(event) {

            checkInputValidity(inputElement)
            toggleButtonActivity(buttonElement, inputList)
        })
    })
    toggleButtonActivity(buttonElement, inputList)
}


function checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid


    if (isInputValid) {
        hideInputError(inputElement)
    } else {
        const errorMessage = inputElement.validationMessage
        showInputError(inputElement, errorMessage)
    }
}

function showInputError(inputElement, errorMessage) {
    const parrentForm = inputElement.closest('.popup__container')
    const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
    console.log(errorMessage);
    console.log(errorElement);
    errorElement.textContent = errorMessage
    errorElement.classList.add('.popup-error_active')
}

function hideInputError(inputElement) {
    const parrentForm = inputElement.closest('.popup__container')
    const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove('.popup-error_active')
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
















enableValidation()