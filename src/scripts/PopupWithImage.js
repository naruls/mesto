import {popupClass} from './popup.js';

export class PopupWithImage extends popupClass {
  constructor(popupSelector) {
    super(popupSelector);
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