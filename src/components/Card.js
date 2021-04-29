export class Card {
  constructor(data, selector, {handleCardClick}) {
    this._data = data;
    this._selector = selector;
    this._name = data.name;;
    this._link = data.link;
    this._alt = data.name;
    this._handleCardClick = handleCardClick;
  }
    _getTemplateElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  createCard(){
    this._element = this._getTemplateElement();
    this._setEventListeners();
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').style.backgroundImage = `url('${this._link}')`;
    this._element.querySelector('.element__image').alt = `На фото изображён ${this._name}`;
    return this._element;
  }
  _likeCard(){
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }
  _deleteCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove();
  }

  _setEventListeners() {
    this._image = this._element.querySelector('.element__image');
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
  })
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
          this._likeCard();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

}
}