export class popupClass {
  constructor(popupElement) {
    this._element = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOverlayClose = this._handleClickClose.bind(this);
  }

  open() {
    this._element.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._element.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup__background') || evt.target.classList.contains('popup__close-image')) {
      this.close();
    }
  }
  setEventListeners() {
    this._element.addEventListener('click', this._handleClickOverlayClose);
  }
}