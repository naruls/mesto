import {popupClass} from './popup.js';

export class PopupWithConfirm extends popupClass {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._element.querySelector('.form');
    this._submitFun = this._submitFun.bind(this);
  }

  _submitFun(evt) {
    evt.preventDefault();
    this._submit(this._data);
  }
  setEventListeners() {
    this._form.addEventListener('submit', this._submitFun);
    super.setEventListeners();
  }

  open(data) {
    this._data = data;
    super.open();
  }
}