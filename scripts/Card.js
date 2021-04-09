export class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._name = data.name;;
    this._link = data.link;
  }
    _getTemplateElement() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  createCard(){
    this._element = this._getTemplateElement();
    
    this._processingLikeIconEvent();
    this._processingDeleteCardEvent();
    this._showImagePopupEvent();
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
  _showImagePopup() {
    const popupCardDescription = document.querySelector('.popup__name');
    const popupCardMain = document.querySelector('.popup__card');
    const popupCardOpen = document.querySelector('.popup_main');
    function openPopup () {
      popupCardOpen.classList.add('popup_active');
    }
    openPopup()
    popupCardMain.src = this._link;
    popupCardMain.alt = `На фото изображён ${this._name}`;
    popupCardDescription.textContent = this._name;
  }
  _showImagePopupEvent() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._showImagePopup()
      console.log('gjd')
    })
  }
}
