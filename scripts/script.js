const container = document.querySelector('.container');
const changeButton = container.querySelector('.profile__change-button');
const resetButton = container.querySelector('.popup__close-button-change');
const resetButtonAdd = container.querySelector('.popup__close-button-add');
const saveButton = container.querySelector('.popup__form');
const popup = container.querySelector('.popup');
const profileName = container.querySelector('.profile__name');
const profileDescription = container.querySelector('.profile__description');
const name = container.querySelector('.popup__input_user_name');
const description = container.querySelector('.popup__input_user_description');
const addButton = container.querySelector('.profile__add-button');
const popupAdd = container.querySelector('.popup_add');
const saveCardButton = container.querySelector('.popup__card-form');
const elements = container.querySelector('.elements');
const closeButtonMain = container.querySelector('.popup__close-button_main');
const cardTemplate = document.querySelector('#card-template').content;
const popupMestoName = document.querySelector('.popup__input_mesto_name');
const popupMestoLink = document.querySelector('.popup__input_mesto_link');
const popupMain = document.querySelector('.popup_main');
const popupCard = container.querySelector('.popup__card')
const popupImageName = container.querySelector('.popup__name');
const cardElementValue = cardTemplate.querySelector('.element');
const overlayProfile = container.querySelector('.popup__background');
const overlayCard = container.querySelector('.popup__background_add');
const overlayImage = container.querySelector('.popup__background_main');
const buttonCard = container.querySelector('.popup__save-card-button');

function shiowPopupProfile() {
name.value= profileName.textContent;
description.value= profileDescription.textContent;
openPopup(popup);
}


function savePopup(evt) {
evt.preventDefault();
profileName.textContent=`${name.value}`;
profileDescription.textContent=`${description.value}`;
closePopup(popup);
}


function createCard(nameCard, linkCard){
const cardElement = cardElementValue.cloneNode(true);
const cardImage = cardElement.querySelector('.element__image');
const cardName = cardElement.querySelector('.element__name');
buttonCard.classList.add('popup__save-button_nonactive');
buttonCard.setAttribute('disabled', true);

cardImage.style.backgroundImage = `url('${linkCard}')`;
cardName.textContent = nameCard; 


cardElement.querySelector('.element__like-button').addEventListener('click', handleLikeIcon);

cardElement.querySelector('.element__delete-button').addEventListener('click', (evt) => {
  const deleteElement = cardElement.closest('.element');
  deleteElement.remove();
})

cardImage.addEventListener('click', function (eventOpenImage) {
  popupCard.src = `${eventOpenImage.target.style.backgroundImage.slice(5, -2)}`;
  popupCard.alt = `На фото изображён ${cardName.textContent}`;
  popupImageName.textContent = cardName.textContent;
  openPopup(popupMain);
});
return cardElement;
}


function renderCard(data, wrap){
  wrap.prepend(data);
}


function handleLikeIcon(likeEvent) {
  likeEvent.target.classList.toggle('element__like-button_active');
};

function openPopup(popup) {
  popup.classList.add('popup_active');
};
function closePopup(popup) {
  popup.classList.remove('popup_active');
};


changeButton.addEventListener('click', shiowPopupProfile); 


resetButton.addEventListener('click', (evt) =>{
closePopup(popup);
}); 

saveButton.addEventListener('submit', savePopup); 


addButton.addEventListener('click', (evt) =>{
openPopup(popupAdd);
}); 


resetButtonAdd.addEventListener('click', (evt) =>{
closePopup(popupAdd);
}); 

initialCards.forEach((item, i)=>{
renderCard(createCard(initialCards[i].name, initialCards[i].link), elements);
});

closeButtonMain.addEventListener('click', (evt) =>{
closePopup(popupMain);
}); 


saveCardButton.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  renderCard(createCard(popupMestoName.value, popupMestoLink.value), elements);
  closePopup(popupAdd);
  popupMestoName.value = "";
  popupMestoLink.value = "";
});

overlayProfile.addEventListener('click', (evt) =>{
closePopup(popup);
}); 

overlayCard.addEventListener('click', (evt) =>{
closePopup(popupAdd);
}); 

overlayImage.addEventListener('click', (evt) =>{
closePopup(popupMain);
}); 

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popupMain);
    closePopup(popupAdd);
    closePopup(popup);
  }
});


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement  = formElement .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(enableValidation.disabledButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(enableValidation.disabledButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}; 

const hideInputError = (formElement, inputElement) => {
  const errorElement  = formElement .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(enableValidation.inputErrorClass);
  errorElement.classList.remove(enableValidation.errorClass);
  errorElement.textContent = "";
};


const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
  const buttonElement = formElement.querySelector(enableValidation.buttonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValid = () => {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValid(); 
