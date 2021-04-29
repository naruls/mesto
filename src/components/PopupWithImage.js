import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._popupImage = this._element.querySelector('.popup__card');
    this._popupDescription = this._element.querySelector('.popup__name');
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `На фото изображён ${data.name}`;
    this._popupDescription.textContent = data.name;
    super.open();
  }
}