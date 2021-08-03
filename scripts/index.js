import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const escapeCode = 27

const buttonEditProfile = document.querySelector('.profile__edit-button')
const buttonAddProfile = document.querySelector('.profile__add-button')
const titletProfile = document.querySelector('.profile__title')
const subTitleProfile = document.querySelector('.profile__subtitle')

const popupEditProfile = document.querySelector('.popup_type_edit-profile')
const formEditProfile = popupEditProfile.querySelector('.popup__container')
const inputNameEditProfile = formEditProfile.querySelector('.popup__text_type_name')
const inputProfessionEditProfile = formEditProfile.querySelector('.popup__text_type_profession')
const buttonSaveEditProfile = formEditProfile.querySelector('.popup__save-button')
const buttonCloseEditProfile = formEditProfile.querySelector('.popup__close-button')

const popupAddCard = document.querySelector('.popup_type_add-card')
const formAddCard = popupAddCard.querySelector('.popup__container')
const inputPlaceAddCard = formAddCard.querySelector('.popup__text_type_place')
const inputSourceAddCard = formAddCard.querySelector('.popup__text_type_source')
const buttonSaveAddCard = formAddCard.querySelector('.popup__save-button')
const buttonCloseAddCard = formAddCard.querySelector('.popup__close-button')

const popupImage = document.querySelector('.popup_type_image')
const imageContainer = popupImage.querySelector('.popup__image-container')
const buttonCloseImage = imageContainer.querySelector('.popup__close-button')
const pictureImage = imageContainer.querySelector('.popup__image')
const titleImage = imageContainer.querySelector('.popup__title')


const elementsList = document.querySelector('.elements__list')
const template = elementsList.querySelector('.template').content

const popupList = Array.from(document.querySelectorAll('.popup'))
const formList = Array.from(document.querySelectorAll('.popup__container'))
let formToBlock = null

// function blockButton(event) {
//     event.submitter.setAttribute('disabled', true)
// }

function addCard(item) {
    const newCard = createCard(item)
    elementsList.prepend(newCard);
}

function createCard(item) {
    const card = new Card(item, '.template')
    return card.generateCard();

}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closeOnEscPopup)
}

function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closeOnEscPopup)
}

function submitEditProfileForm(event) {
    event.preventDefault()
    titletProfile.textContent = inputNameEditProfile.value;
    subTitleProfile.textContent = inputProfessionEditProfile.value;
    closePopup(popupEditProfile)
        // formEditProfile.reset()
}

function submitAddCardForm(event) {
    event.preventDefault()
    const newCard = {
        name: inputPlaceAddCard.value,
        link: inputSourceAddCard.value
    };
    addCard(newCard)
    closePopup(popupAddCard)
    formAddCard.reset()
    formToBlock.toggleButtonActivity()
}

function setPopupListener(popup) {
    popup.addEventListener('click', closeOnClickPopup)
}

function closeOnClickPopup(event) {
    if (event.target == event.currentTarget) {
        closePopup(event.target)

    }
}

function closeOnEscPopup(event) {
    if (event.keyCode == escapeCode) {
        const activePopup = popupList.find(function(item) {
            return item.classList.contains('popup_opened')
        })
        closePopup(activePopup)
    }
}


buttonEditProfile.addEventListener('click', function() {
    openPopup(popupEditProfile)
    setPopupListener(popupEditProfile)
})

buttonAddProfile.addEventListener('click', function() {
    openPopup(popupAddCard)
    setPopupListener(popupAddCard)
})

buttonCloseImage.addEventListener('click', function() {
    closePopup(popupImage)
})

buttonCloseAddCard.addEventListener('click', function(event) {
    event.preventDefault()
    formAddCard.reset()
    closePopup(popupAddCard)
})

buttonCloseEditProfile.addEventListener('click', function(event) {
    event.preventDefault()
    closePopup(popupEditProfile)
})

formEditProfile.addEventListener('submit', submitEditProfileForm)

formAddCard.addEventListener('submit', submitAddCardForm)

popupImage.addEventListener('click', closeOnClickPopup)


initialCards.forEach((item) => {
    addCard(item)
});


formList.forEach(function(formElement) {
    const form = new FormValidator({
        formSelector: '.popup__container',
        inputSelector: '.popup__text',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__text_error',
        errorClass: 'popup__error_visible'
    }, formElement)
    form.enableValidation()
    formToBlock = form
})


export { openPopup, pictureImage, titleImage, popupImage }