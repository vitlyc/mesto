// const popupEditProfile = document.querySelector('.popup_type_edit-profile')
// const formEditProfile = popupEditProfile.querySelector('.popup__container')
// const inputNameEditProfile = formEditProfile.querySelector('.popup__text_type_name')
// const inputProfessionEditProfile = formEditProfile.querySelector('.popup__text_type_profession')
// const buttonSaveEditProfile = formEditProfile.querySelector('.popup__save-button')
// const buttonCloseEditProfile = formEditProfile.querySelector('.popup__close-button')


// const popupAddCard = document.querySelector('.popup_type_add-card')
// const formAddCard = popupAddCard.querySelector('.popup__container')
// const inputPlaceAddCard = formAddCard.querySelector('.popup__text_type_place')
// const inputSourceAddCard = formAddCard.querySelector('.popup__text_type_source')
// const buttonSaveAddCard = formAddCard.querySelector('.popup__save-button')
// const buttonCloseAddCard = formAddCard.querySelector('.popup__close-button')

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
    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function(event) {
            console.log(event.target.name);
            checkInputValidity(inputElement)
        })
    })
}


function checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid
    console.log(isInputValid);

    if (isInputValid) {
        hideInputError(inputElement)
    } else {
        const errorMessage = inputElement.validationMessage
        showInputError(inputElement, errorMessage)
    }
}

function showInputError(inputElement, errorMessage) {
    const parrentForm = inputElement.closest('.popup__container')
    console.log(parrentForm);
    const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
    console.log(errorElement);
    errorElement.textContent = errorMessage
        //Добавить класс элементу еррор
}

function hideInputError(inputElement) {
    const parrentForm = inputElement.closest('.popup__container')
    console.log(parrentForm);
    const errorElement = parrentForm.querySelector(`.${inputElement.id}-error`)
    console.log(errorElement);
    errorElement.textContent = ''
        //Удалить класс элементу еррор
}

















enableValidation()