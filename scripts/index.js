// console.log()
const popupForm = document.querySelector('.poup__container')
const popupElement = document.querySelector('.popup')
const popupClose = popupElement.querySelector('.popup__close-button')
const popupSave = popupElement.querySelector('.popup__save-button')
const profileEdit = document.querySelector('.profile__edit-button')
const popupFieldName = document.querySelector('.input__text_type_name')
const popupFieldProf = document.querySelector('.input__text_type_profession')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

const elementHeart = document.querySelectorAll('.element__heart')
const elements = document.querySelector('.elements')
const elementTitle = document.querySelector('.element__title')
const togglePopupVisibility = function(evt) {
    evt.preventDefault()
    popupElement.classList.toggle('popup_opened')
}

const saveForm = function(evt) {
    evt.preventDefault()
    profileTitle.textContent = popupFieldName.value
    profileSubtitle.textContent = popupFieldProf.value
    popupElement.classList.toggle('popup_opened')
}

profileEdit.addEventListener('click', togglePopupVisibility)
popupClose.addEventListener('click', togglePopupVisibility)
popupForm.addEventListener('submit', saveForm)

elements.addEventListener('click', function(event) {
    let target = event.target;
    // console.log(target.classList[0])
    if (target.classList[0] != 'element__heart') return;
    target.classList.toggle('element__heart_active')

})


window.addEventListener('resize', function() {

    if (window.innerWidth > 720) {
        elementTitle.textContent = 'Карачаевск'
    } else(elementTitle.textContent = 'Карачаево-Черкесия')
}, true);