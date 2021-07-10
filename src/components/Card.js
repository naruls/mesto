export class Card {
  constructor(data, selector, {handleCardClick, setLike, removeLike, deleteMyCard}, myId ) {
    this._data = data;
    this._selector = selector;
    this._name = data.name;;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._myId = myId;
    this._deleteMyCard = deleteMyCard;
  }
    _getTemplateElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  createCard(){
    this._element = this._getTemplateElement();
    this._likeButton = this._element.querySelector('.element__like-button');
    this._likeNumber = this._element.querySelector('.element__like-count');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners();
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector('.element__like-count').textContent = `${this._likes.length}`;
    this._checkLiked();
    this._checkCard();
    return this._element;
  }


  _setEventListeners() {
    this._image = this._element.querySelector('.element__image');
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
  })
    this._deleteButton.addEventListener('click', this._deleteMyCard);
      this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like-button_active')) {
        this._unlike(this._data);
      } else {
        this._like(this._data);
      }
    })
}
  likeCount(data) {
    this._element.querySelector('.element__like-count').textContent = `${data.likes.length}`;
  }

  _unlike(data) {
    this._likeButton.classList.remove('element__like-button_active');
    this._removeLike(this._data);
  }

  _like(data) {
    this._likeButton.classList.add('element__like-button_active');
    this._setLike(this._data);
  }
  _checkLiked() {
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._likeButton.classList.add('element__like-button_active');
      }
    })
  }
  deleteCard() {
    this._deleteElement(this._element);
  }
  _deleteElement(element) {
    element.remove();
    element = null;
  }
  _checkCard() {
    if (this._data.owner._id !== this._myId) {
      this._deleteElement(this._deleteButton);
    }
  }
}