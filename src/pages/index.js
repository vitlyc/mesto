// import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/API.js';

import {
    //initialCards,
    buttonEditProfile,
    buttonAddProfile,
    // buttonCloseAddCard,
    // buttonCloseEditProfile,
    titleProfile,
    subtitleProfile,
    userAvatar,
    // titleProfileSelector,
    // subtitleProfileSelector,
    // elementsList,
    elementsListSelector,
    // popupImage,
    popupImageSelector,
    popupEditProfile,
    popupEditProfileSelector,
    popupAddCard,
    popupAddCardSelector,
    formEditProfile,
    formAddCard,
    config,
    buttonEditAvatar,
    formApproval,
    // popupApproval,
    popupApprovalSelector,
    popupAvatar,
    popupAvatarSelector,
    // formAvatar
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '75a4d77e-dc39-4d34-8088-d75cda9dec2f',
        'Content-Type': 'application/json'
    }
});

const userInfo = new UserInfo(titleProfile, subtitleProfile, userAvatar);

let userId;

api.getUserInfo()
    .then((data) => {
        userId = data._id;
        userInfo.setUserInfo(data);
    })
    .catch((err) => {
        console.log(err);
    })

const handlers = {
    handleCardClick: (title, link) => {
        sampleImagePopup.open(title, link)
    },
    handleDeleteClick: (cardObject) => {
        popupConfirm.cardObject = cardObject;
        popupConfirm.open()
            // console.log(cardObject);
    },
    handleLikeClick: (cardId, isLiked) => {
        return api.likeCard(cardId, isLiked)
    }

}

let cardsList;

api.getInitialCards()
    .then((data) => {
        cardsList = new Section({
            items: data,
            renderer: (item) => {
                const cardElement = createCard(item);
                cardsList.addItem(cardElement);
            }
        }, elementsListSelector);
        cardsList.renderItems();
    })
    .catch((err) => {
        console.log(err);
    })

function createCard(data) {
    const card = new Card({
        data: data,
        cardSelector: '.template',
        userId: userId,
        handlers
    })
    const cardElement = card.createCard();
    card.setCountLikes(cardElement);
    card.updateCountLikes(cardElement);
    return cardElement;
}

function renderLoading(popup, isLoading) {
    const submitButton = popup.querySelector('.popup__save-button');
    if (isLoading) {
        submitButton.textContent = 'Сохранение...'
    } else {
        submitButton.textContent = 'Сохранить'
    }
}

const popupWithFormProfile = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (info) => {
        // console.log(info);
        renderLoading(popupEditProfile, true);
        api.setUserInfo(info.name, info.profession)
            .then((data) => {
                userInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                renderLoading(popupEditProfile, false))
    }
})
const popupWithFormAddCard = new PopupWithForm({
    popupSelector: popupAddCardSelector,
    handleFormSubmit: (info) => {
        // console.log(info);
        renderLoading(popupAddCard, true);
        api.createNewCard(info.name, info.link)
            .then((data) => {
                const cardElement = createCard(data);
                cardsList.addItem(cardElement);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() =>
                renderLoading(popupAddCard, false))

    }
})
const popupWithFormAvatar = new PopupWithForm({
    popupSelector: popupAvatarSelector,
    handleFormSubmit: (info) => {
        // console.log(info);
        renderLoading(popupAvatar, true);
        api.setAvatar(info.link)
            .then((data) => {
                userInfo.setUserInfo(data);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() =>
                renderLoading(popupAvatar, false))
    }
})

const sampleImagePopup = new PopupWithImage(popupImageSelector);

const popupConfirm = new PopupWithConfirm({
    popupSelector: popupApprovalSelector,
    handleDeleteCard: () => {
        const cardId = popupConfirm.cardObject._cardId;
        // console.log(popupConfirm.cardObject._cardId);
        api.deleteCard(cardId)
            .then(() => {
                popupConfirm.cardObject.deleteCard()
                popupConfirm.close()
                popupConfirm.cardObject = '';
            })
            .catch(err => {
                console.log(err);
            })
    }
})

buttonAddProfile.addEventListener('click', function() {
    // sampleFormAddCard.removeErrors();
    sampleFormAddCard.blockButton();
    sampleFormAddCard.clearInputError()
    popupWithFormAddCard.open();
});

buttonEditProfile.addEventListener('click', function() {
    const userData = userInfo.getUserInfo();
    // console.log(userData);
    formEditProfile.name.value = userData.name;
    formEditProfile.profession.value = userData.job;
    // sampleFormProfile.removeErrors();
    sampleFormProfile.toggleButtonState();
    popupWithFormProfile.open();
    sampleFormProfile.clearInputError()
})

//кнопка аватара
buttonEditAvatar.addEventListener('click', function() {
    popupWithFormAvatar.open();
    sampleFormAvatar.clearInputError()

})

const sampleFormProfile = new FormValidator(config, formEditProfile);
sampleFormProfile.enableValidation();

const sampleFormAddCard = new FormValidator(config, formAddCard);
sampleFormAddCard.enableValidation();

const sampleFormAvatar = new FormValidator(config, formApproval);
sampleFormAvatar.enableValidation();


// api.getUserInfo()
//     .then((data) => { console.log(data) })

// console.log(document.querySelectorAll('.popup__text_type_avatar'));
// let avatar = document.forms["update-avatar"].elements.link
// console.log(avatar);
// avatar.placeholder = 'hi'