
export class FormValidator {
  constructor(enableObject, formElement) {
    this._inputSelector = enableObject.inputSelector;
    this._buttonSelector = enableObject.buttonSelector;
    this._disabledButtonClass = enableObject.disabledButtonClass;
    this._inputErrorClass = enableObject.inputErrorClass;
    this._errorClass = enableObject.errorClass;
    this._formElement = formElement; // Элемент формы, а не селектор
  }
_showInputError (inputElement, errorMessage) {
  const errorElement  = this._formElement .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(this._errorClass);
};

_hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

_toggleButtonState (inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._disabledButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(this._disabledButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}; 

_hideInputError (inputElement) {
  const errorElement  = this._formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = "";
};


_isValid (inputElement)  {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
};

_setEventListeners (formElement, data)  {
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  const buttonElement = this._formElement.querySelector(this._buttonSelector);
  this._toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(inputElement)
      this._toggleButtonState(inputList, buttonElement);
    });
  });
}; 

enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
}
}

