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



function createCard(item) {
    const newCard = template.cloneNode(true)
    newCard.querySelector('.element__title').textContent = item.name
    const imageCard = newCard.querySelector('.element__image')
    imageCard.src = item.link
    imageCard.alt = item.name
    imageCard.addEventListener('click', displayImagePopup)
    newCard.querySelector('.element__remove-button').addEventListener('click', removeCard)
    newCard.querySelector('.element__heart').addEventListener('click', toggleHeart)
    console.log(newCard);

    return newCard
}

function addCard(card) {
    const element = createCard(card)

    elementsList.prepend(element)
}

function removeCard(event) {
    event.target.closest('.element').remove()
}

function displayImagePopup(evt) {
    const targetImage = evt.target
    pictureImage.src = targetImage.src
    pictureImage.alt = targetImage.alt
    titleImage.textContent = targetImage.alt
    togglePopup(popupImage)

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
        name: inputPlaceAddCard.value,
        link: inputSourceAddCard.value
    };
    addCard(newCard)
    togglePopup(popupAddCard)
    formAddCard.reset()
}

initialCards.forEach(function(item) {
    addCard(item)
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
    formAddCard.reset()
    togglePopup(popupAddCard)
})

buttonCloseEditProfile.addEventListener('click', function() {
    togglePopup(popupEditProfile)
})

formEditProfile.addEventListener('submit', submitEditProfileForm)



formAddCard.addEventListener('submit', submitAddCardForm)