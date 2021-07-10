export class FormValidator { 
  constructor(enableObject, formElement) { 
    this._inputSelector = enableObject.inputSelector; 
    this._buttonSelector = enableObject.buttonSelector; 
    this._disabledButtonClass = enableObject.disabledButtonClass; 
    this._inputErrorClass = enableObject.inputErrorClass; 
    this._errorClass = enableObject.errorClass; 
    this._formElement = formElement; // Элемент формы, а не селектор 
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
    this._buttonElement = this._formElement.querySelector(this._buttonSelector); 
  } 
_showInputError (inputElement, errorMessage) { 
  const errorElement  = this._formElement .querySelector(`#${inputElement.id}-error`); 
  inputElement.classList.add(this._inputErrorClass); 
  errorElement.textContent = inputElement.validationMessage; 
  errorElement.classList.add(this._errorClass); 
}; 
 
_hasInvalidInput (inputList) { 
  return this._inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }) 
};  
 
_toggleButtonState (inputList, buttonElement) { 
  if (this._hasInvalidInput(this._inputList)) { 
    this._buttonElement.classList.add(this._disabledButtonClass); 
    this._buttonElement.setAttribute('disabled', true); 
  } else { 
    this._buttonElement.classList.remove(this._disabledButtonClass); 
    this._buttonElement.removeAttribute('disabled', true); 
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
 
_setEventListeners ()  { 
  this._toggleButtonState(this._inputList, this._buttonElement); 
  this._inputList.forEach((inputElement) => { 
    inputElement.addEventListener('input', () => { 
      this._isValid(inputElement) 
      this._toggleButtonState(this._inputList, this._buttonElement); 
    }); 
  }); 
};  
 
clear(){ 
 const objectsNeedClear = this._formElement.querySelectorAll(`.${this._inputErrorClass}`); 
  objectsNeedClear.forEach((object) => { 
      this._hideInputError(object); 
  }); 
    this._buttonElement.classList.add(this._disabledButtonClass); 
    this._buttonElement.setAttribute('disabled', true); 
} 
 
enableValidation () { 
 
    this._formElement.addEventListener('submit', (evt) => { 
      evt.preventDefault(); 
    }); 
    this._setEventListeners(); 
}; 
} 
