
const showInputError = (formElement, inputElement, errorMessage, data) => {
  const errorElement  = formElement .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(data.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(data.errorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement, data) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(data.disabledButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(data.disabledButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}; 

const hideInputError = (formElement, inputElement, data) => {
  const errorElement  = formElement .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(data.inputErrorClass);
  errorElement.classList.remove(data.errorClass);
  errorElement.textContent = "";
};


const isValid = (formElement, inputElement, data) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, data);
  } else {
    hideInputError(formElement, inputElement, data);
  }
};

const setEventListeners = (formElement, data) => {
  const inputList = Array.from(formElement.querySelectorAll(data.inputSelector));
  const buttonElement = formElement.querySelector(data.buttonSelector);
  toggleButtonState(inputList, buttonElement, data);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, data)
      toggleButtonState(inputList, buttonElement, data);
    });
  });
}; 

const enableValidation = (data) => {
  const formList = Array.from(document.querySelectorAll(data.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, data);
  });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__submit',
    inputErrorClass: 'popup__input_errore',
    errorClass: 'popup__input-error_active',
    disabledButtonClass: 'popup__save-button_nonactive'
});
