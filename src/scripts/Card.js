export class Card {
  constructor(data, selector, {handleCardClick}) {
    this._data = data;
    this._selector = selector;
    this._name = data.name;;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
  }
    _getTemplateElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  createCard(){
    this._element = this._getTemplateElement();
    this._setEventListeners();
    this._processingLikeIconEvent();
    this._processingDeleteCardEvent();
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__image').style.backgroundImage = `url('${this._link}')`;
    return this._element;
  }
  _processingLikeIcon(){
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }
  _processingLikeIconEvent(){
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
    this._processingLikeIcon();
    })
  }
  _processingDeleteCard() {
    this._element.querySelector('.element__delete-button').closest('.element').remove();
  }
  _processingDeleteCardEvent() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._processingDeleteCard();
    });
  }

  _setEventListeners() {
    this._image = this._element.querySelector('.element__image');
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._data);
  })
}
}