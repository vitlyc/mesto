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
const contImage = popupImage.querySelector('.popup__image-container')
const buttonCloseImage = contImage.querySelector('.popup__close-button')
const pictureImage = contImage.querySelector('.popup__image')
const titleImage = contImage.querySelector('.popup__title')


const elementsList = document.querySelector('.elements__list')
const template = elementsList.querySelector('.template').content



function createCard(item) {
    const newCard = template.cloneNode(true)
    newCard.querySelector('.element__title').textContent = item.name
    const imageCard = newCard.querySelector('.element__image')
    imageCard.src = item.link
    imageCard.alt = item.name
    imageCard.addEventListener('click', displayImagePopup)
    newCard.querySelector('.element__remove-button').addEventListener('click', removeCard)
    newCard.querySelector('.element__heart').addEventListener('click', toggleHeart)
    return addCard(newCard)
}

function addCard(card) {
    elementsList.prepend(card)
}

function removeCard(event) {
    event.target.closest('.element').remove()
}

function displayImagePopup(evt) {
    const targetImage = evt.target
    pictureImage.src = targetImage.src
    pictureImage.alt = targetImage.alt
    titleImage.textContent = targetImage.alt
    popupImage.classList.toggle('popup_opened')

}

function toggleHeart(event) {
    event.target.classList.toggle('element__heart_active')
}

function togglePopup(popup) {
    popup.classList.toggle('popup_opened')
}


function submitEditProfileForm(event) {
    event.preventDefault()
    titletProfile.textContent = inputNameEditProfile.value;
    subTitleProfile.textContent = inputProfessionEditProfile.value;
    togglePopup(popupEditProfile)
}

function submitAddCardForm(event) {
    event.preventDefault()
    const newCard = {
        name: "",
        link: ""
    };
    newCard.name = inputPlaceAddCard.value
    newCard.link = inputSourceAddCard.value
    createCard(newCard)
}

initialCards.forEach(function(item) {
    createCard(item)
})


buttonEditProfile.addEventListener('click', function() {
    togglePopup(popupEditProfile)
})

buttonAddProfile.addEventListener('click', function() {
    togglePopup(popupAddCard)
})

buttonCloseImage.addEventListener('click', function() {
    togglePopup(popupImage)
})

buttonCloseAddCard.addEventListener('click', function() {
    inputPlaceAddCard.value = null
    inputSourceAddCard.value = null
    togglePopup(popupAddCard)
})

buttonCloseEditProfile.addEventListener('click', function() {
    togglePopup(popupEditProfile)
})

formEditProfile.addEventListener('submit', submitEditProfileForm)



formAddCard.addEventListener('submit', submitAddCardForm)