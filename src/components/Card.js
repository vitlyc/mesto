export default class Card {
    constructor({ data, cardSelector, userId, handlers }) {
        this._title = data.name;
        this._link = data.link;
        this._ownerId = data.owner._id;
        this._likes = data.likes;
        this._cardId = data._id;
        this._cardSelector = cardSelector;
        this._userId = userId;
        this._handleCardClick = handlers.handleCardClick;
        this._handleLikeClick = handlers.handleLikeClick;
        this._handleDeleteClick = handlers.handleDeleteClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
        return cardElement;
    }
    createCard() {
        this._element = this._getTemplate();
        this._buttonLike = this._element.querySelector('.element__heart');
        this._likesCounter = this._element.querySelector('.element__counter');
        this._buttonDelete = this._element.querySelector('.element__remove-button');
        this._cardImage = this._element.querySelector('.element__image');
        this._cardTitle = this._element.querySelector('.element__title');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._possibleToDelete();
        this._setEventListeners();
        return this._element;
    }
    _toggleHeart() {
        this._handleLikeClick(this._cardId, this.isLiked)
            .then((data) => {
                this._buttonLike.classList.toggle('element__heart_active');
                this.isLiked = !this.isLiked;
                this._likesCounter.textContent = data.likes.length;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    setCountLikes(card) {

        if (this._likes.some(someUser => someUser._id === this._userId)) {
            // console.log(this._likes);
            this._buttonLike.classList.add('element__heart_active');
        }
    }
    _setEventListeners() {
        this._buttonLike.addEventListener('click', () => {
            this._toggleHeart();
        });

        this._buttonDelete.addEventListener('click', () => {
            this._handleDeleteClick(this);
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._link);
        });
    }
    updateCountLikes(card) {
        this._likesCounter.textContent = this._likes.length;
    }



    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _possibleToDelete() {
        if (this._userId !== this._ownerId) { this._buttonDelete.remove() }


    }

}