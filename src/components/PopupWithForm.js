import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupElement, { submit }) {
    super(popupElement);
    this._submit = submit;
    this._form = this._element.querySelector('.form');
    this._submitForm = this._submitForm.bind(this);
  }

  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    const data = {};
    inputsList.forEach(item => {
      data[item.name] = item.value;
    })
    return data;
  }
  _submitForm(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }
  setEventListeners() {
    this._form.addEventListener('submit', this._submitForm);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}