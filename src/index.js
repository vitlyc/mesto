import './pages/index.css';

import Card from './components/Card.js';
import Section from './components/Section.js';
import FormValidator from './components/FormValidator.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';

import {
    initialCards,
    buttonEditProfile,
    buttonAddProfile,
    buttonCloseAddCard,
    buttonCloseEditProfile,
    subtitleProfile,
    elementsList,
    titletProfile,
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
} from './utils/constants.js';


const elementPopupImage = new PopupWithImage(popupImageSelector);

const clickCard = (name, link) => {
    elementPopupImage.open(name, link);
}

const cardList = new Section({
        data: initialCards,
        renderer: (item) => {

            const card = new Card({
                data: item,
                handleCardClick: (name, link) => {
                    clickCard(name, link);
                },
            }, '.template');

            const cardElement = card.createCard();
            cardList.setItem(cardElement);
        },
    },
    elementsListSelector
);
const sampleFormProfile = new FormValidator(config, formEditProfile);
const sampleFormAddCard = new FormValidator(config, formAddCard);
cardList.addItem();

const user = new UserInfo(titletProfile, subtitleProfile);

const sampleEditProfile = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (value) => {
        // console.log(value);
        user.setUserInfo(value.name, value.profession);
        sampleEditProfile.close();

    }
});

buttonEditProfile.addEventListener('click', () => {
    sampleEditProfile.open();
    const userData = user.getUserInfo();
    // console.log(userData);
    formEditProfile.name.value = userData.name;
    formEditProfile.profession.value = userData.profession;

});


const sampleAddCard = new PopupWithForm({
    popupSelector: popupAddCardSelector,
    handleFormSubmit: (value) => {

        const renderCard = function(data, cardSelector) {
            return new Card({
                data: value,
                handleCardClick: (name, link) => {
                    clickCard(name, link);
                },
            }, cardSelector);
        }
        const card = renderCard({ name: value.name, link: value.link }, '.template');
        cardList.setItem(card.createCard());
        sampleAddCard.close();

    },
});

buttonAddProfile.addEventListener('click', () => {
    sampleAddCard.open();
    formAddCard.name.value = '';
    formAddCard.link.value = '';
});
buttonCloseEditProfile.addEventListener('click', () =>
    sampleFormProfile.clearInputError()
);
buttonCloseAddCard.addEventListener('click', () =>
    sampleFormAddCard.clearInputError()
);

sampleEditProfile.setEventListeners();
sampleAddCard.setEventListeners();
elementPopupImage.setEventListeners();


sampleFormProfile.enableValidation();
sampleFormAddCard.enableValidation();