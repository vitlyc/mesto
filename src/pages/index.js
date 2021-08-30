import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Api from '../components/API.js';

import {
    buttonEditProfile,
    buttonAddProfile,
    titleProfile,
    subtitleProfile,
    userAvatar,
    elementsListSelector,
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
    popupApprovalSelector,
    popupAvatar,
    popupAvatarSelector,
} from '../utils/constants.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
    headers: {
        authorization: '75a4d77e-dc39-4d34-8088-d75cda9dec2f',
        'Content-Type': 'application/json'
    }
});

// const serverCards = await api.getInitialCards()
// console.log(serverCards);

let cardsList

const userInfo = new UserInfo(titleProfile, subtitleProfile, userAvatar);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.setUserInfo(userData)

        console.log(userData._id);
        console.log(initialCards);

        cardsList = new Section({
            items: initialCards,
            renderer: (item) => {
                const cardElement = createCard(item, userData._id);
                cardsList.addItem(cardElement);
            }
        }, elementsListSelector);
        cardsList.renderItems();


    })

const handlers = {
    handleCardClick: (title, link) => {
        sampleImagePopup.open(title, link)
    },
    handleDeleteClick: (cardData) => {
        popupConfirm.cardData = cardData;
        popupConfirm.open()
            // console.log(cardData);
    },
    handleLikeClick: (cardId, isLiked) => {
        return api.likeCard(cardId, isLiked)
    }
}

function createCard(cardsData, myID) {
    const card = new Card({
        data: cardsData,
        cardSelector: '.template',
        userId: myID,
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
            .finally(() => {
                renderLoading(popupEditProfile, false)
                popupWithFormProfile.close()
            })
    }
})
const popupWithFormAddCard = new PopupWithForm({
    popupSelector: popupAddCardSelector,
    handleFormSubmit: (info) => {

        renderLoading(popupAddCard, true);
        api.createNewCard(info.name, info.link)
            .then((data) => {
                const cardElement = createCard(data, data.owner._id);
                cardsList.addItem(cardElement);
                popupWithFormAddCard.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(popupEditProfile, false)
                popupWithFormProfile.close()
            })

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
                popupWithFormAvatar.close()
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoading(popupEditProfile, false)
                popupWithFormProfile.close()
            })
    }
})

const sampleImagePopup = new PopupWithImage(popupImageSelector);

const popupConfirm = new PopupWithConfirm({
    popupSelector: popupApprovalSelector,
    handleDeleteCard: () => {
        const cardId = popupConfirm.cardData._cardId;
        // console.log(popupConfirm.cardData._cardId);
        api.deleteCard(cardId)
            .then(() => {
                popupConfirm.cardData.deleteCard()
                popupConfirm.close()
                popupConfirm.cardData = '';
            })
            .catch(err => {
                console.log(err);
            })
    }
})

buttonAddProfile.addEventListener('click', function() {
    // sampleFormAddCard.
    sampleFormAddCard.blockButton();
    sampleFormAddCard.clearInputError()
    popupWithFormAddCard.open();
});

buttonEditProfile.addEventListener('click', function() {
    const userData = userInfo.getUserInfo();
    // console.log(userData);
    formEditProfile.name.value = userData.name;
    formEditProfile.profession.value = userData.job;
    // sampleFormProfile.
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