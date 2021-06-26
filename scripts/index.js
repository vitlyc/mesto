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
const elementsList = document.querySelector('.elements__list')
const template = document.querySelector('.template').content



initialCards.forEach(function(item) {

    makingElement(item)
})




function makingElement(item) {
    const newElement = template.cloneNode(true)
    newElement.querySelector('.element__title').textContent = item.name
    newElement.querySelector('.element__image').src = item.link
    elementsList.appendChild(newElement)
}

const elementRemove = document.querySelector('.element__remove-button')

const addButton = document.querySelector('.profile__add-button')
const addPopupForm = document.querySelector('.add-popup__container')
const addPopupElement = document.querySelector('.add-popup')
const addPopupClose = addPopupElement.querySelector('.add-popup__close-button')
const addPopupSave = addPopupElement.querySelector('.add-popup__save-button')
const addPopupFieldPlace = document.querySelector('.add-popup__text_type_place')
const addPopupFieldSource = document.querySelector('.add-popup__text_type_source')

const popupForm = document.querySelector('.popup__container')
const popupElement = document.querySelector('.popup')
const popupClose = popupElement.querySelector('.popup__close-button')
const popupSave = popupElement.querySelector('.popup__save-button')
const profileEdit = document.querySelector('.profile__edit-button')
const popupFieldName = document.querySelector('.popup__text_type_name')
const popupFieldProf = document.querySelector('.popup__text_type_profession')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

const elementHeart = document.querySelectorAll('.element__heart')
const elements = document.querySelector('.elements')
const elementTitle = document.querySelector('.element__title')

function togglePopupVisibility(event) {
    event.preventDefault()
    popupElement.classList.toggle('popup_opened')
}

function toggleAddpopupVisibility(event) {
    event.preventDefault()
    addPopupElement.classList.toggle('add-popup_opened')
}


const saveForm = function(evt) {
    // console.log(evt.target.classList[0]);
    if (evt.target.classList[0] == 'popup__container') {
        evt.preventDefault();
        profileTitle.textContent = popupFieldName.value;
        profileSubtitle.textContent = popupFieldProf.value;
        popupElement.classList.toggle('popup_opened');
    } else if (evt.target.classList[0] == 'add-popup__container') {
        evt.preventDefault();
        addPopupElement.classList.toggle('add-popup_opened')
        let newItem = {
            name: "",
            link: ""
        };
        newItem.name = addPopupFieldPlace.value
        newItem.link = addPopupFieldSource.value
        console.log(newItem);
        makingElement(newItem)
    }


}






profileEdit.addEventListener('click', togglePopupVisibility)
popupClose.addEventListener('click', togglePopupVisibility)
addButton.addEventListener('click', toggleAddpopupVisibility)
addPopupClose.addEventListener('click', toggleAddpopupVisibility)


popupForm.addEventListener('submit', saveForm)
addPopupForm.addEventListener('submit', saveForm)
elements.addEventListener('click', function(event) {
    let target = event.target;

    if (target.classList[0] == 'element__heart') {
        target.classList.toggle('element__heart_active')
    } else if (target.classList[0] == 'element__remove-button') {
        event.target.closest('.element').remove()

    }


})


window.addEventListener('resize', function() {

    if (window.innerWidth > 720) {
        elementTitle.textContent = 'Карачаевск'
    } else(elementTitle.textContent = 'Карачаево-Черкесия')
}, true);