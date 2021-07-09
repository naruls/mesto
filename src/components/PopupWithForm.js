import {popupClass} from './popup.js';

export class PopupWithForm extends popupClass {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._element.querySelector('.form');
    this._submitFun = this._submitFun.bind(this);
    this._button = this._form.querySelector('.popup__save-button');
  }

  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    const data = {};
    inputsList.forEach(item => {
      data[item.name] = item.value;
    })
    return data;
  }
  _submitFun(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }
  setEventListeners() {
    this._form.addEventListener('submit', this._submitFun);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
  render(loading) {
    if (loading) {
      this._button.textContent = 'Cохранение...';
    } else {
      this._button.textContent = 'Сохранить';
    }
  }
}