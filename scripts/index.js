import { Card, initialCards } from './Card.js';



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


function blockButton(event) {

    event.submitter.setAttribute('disabled', true)
}

// function createCard(item) {
//     const newCard = template.cloneNode(true)
//     newCard.querySelector('.element__title').textContent = item.name
//     const imageCard = newCard.querySelector('.element__image')
//     imageCard.src = item.link
//     imageCard.alt = item.name
//     imageCard.addEventListener('click', displayImagePopup)
//     newCard.querySelector('.element__remove-button').addEventListener('click', removeCard)
//     newCard.querySelector('.element__heart').addEventListener('click', toggleHeart)
//     return newCard
// }

function addCard(item) {
    const card = new Card(item, '.template')
    const cardElement = card.generateCard();
    elementsList.prepend(cardElement);
}

// function removeCard(event) {
//     event.target.closest('.element').remove()
// }

// function displayImagePopup(evt) {
//     const targetImage = evt.target
//     pictureImage.src = targetImage.src
//     pictureImage.alt = targetImage.alt
//     titleImage.textContent = targetImage.alt
//     openPopup(popupImage)
//     setPopupListener(popupImage)
// }

// function toggleHeart(event) {
//     event.target.classList.toggle('element__heart_active')
// }

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
    blockButton(event)
    addCard(newCard)
    closePopup(popupAddCard)
    formAddCard.reset()
}

function setPopupListener(popup) {
    popup.addEventListener('click', closeOnClickPopup)

}

function closeOnClickPopup(event) {
    if (event.target == event.currentTarget) {
        closePopup(event.target)
        event.target.removeEventListener('click', closeOnClickPopup)
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





initialCards.forEach((item) => {
    addCard(item)
});



export { openPopup, setPopupListener, pictureImage, titleImage, popupImage }