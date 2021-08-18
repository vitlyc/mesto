import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';


import {
    initialCards,
    buttonEditProfile,
    buttonAddProfile,
    buttonCloseAddCard,
    buttonCloseEditProfile,
    titleProfile,
    subtitleProfile,
    titleProfileSelector,
    subtitleProfileSelector,
    elementsList,
    elementsListSelector,
    popupImage,
    popupImageSelector,
    popupEditProfile,
    popupEditProfileSelector,
    popupAddCard,
    popupAddCardSelector,
    formEditProfile,
    formAddCard,
    config
} from '../utils/constants.js';

const elementPopupImage = new PopupWithImage(popupImageSelector);

const clickCard = (name, link) => {
    elementPopupImage.open(name, link);
}
const sampleFormProfile = new FormValidator(config, formEditProfile);
const sampleFormAddCard = new FormValidator(config, formAddCard);


const user = new UserInfo(titleProfileSelector, subtitleProfileSelector);

const samplePopupProfile = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (value) => {
        // console.log(value);
        user.setUserInfo(value.name, value.profession);
        samplePopupProfile.close();

    }
});


function createCard(data, cardSelector) {
    return new Card({
        data: data,
        handleCardClick: (name, link) => {
            clickCard(name, link);
        },
    }, cardSelector);
}

const CardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = createCard(item, 'template');

        const cardElement = card.createCard();
        CardList.setItem(cardElement);
    },
}, elementsListSelector);

CardList.addItem();

const samplePopupAddCard = new PopupWithForm({
    popupSelector: popupAddCardSelector,
    handleFormSubmit: (value) => {
        const card = createCard(value, 'template');

        CardList.setItem(card.createCard());
        samplePopupAddCard.close();
    },
});




buttonEditProfile.addEventListener('click', () => {
    samplePopupProfile.open();
    sampleFormProfile.toggleButtonState()
    const userData = user.getUserInfo();
    formEditProfile.name.value = userData.name;
    formEditProfile.profession.value = userData.profession;

});

buttonAddProfile.addEventListener('click', () => {
    samplePopupAddCard.open();
    sampleFormAddCard.blockButton()
});

buttonCloseEditProfile.addEventListener('click', () =>
    sampleFormProfile.clearInputError()
);
buttonCloseAddCard.addEventListener('click', () =>
    sampleFormAddCard.clearInputError()
);



sampleFormProfile.enableValidation();
sampleFormAddCard.enableValidation();

samplePopupProfile.setEventListeners();
samplePopupAddCard.setEventListeners();
elementPopupImage.setEventListeners();




// test