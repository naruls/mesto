import '../pages/style.css';
import {Section} from './Section.js';
import {UserInfo} from './UserInfo.js';
import {popupClass} from './popup.js';
import {PopupWithForm} from './PopupWithForm.js';
import {PopupWithImage} from './PopupWithImage.js';
import {Card} from './Card.js';
import {initialCards} from './initial-сards.js';
import {FormValidator} from './validate.js';

const container = document.querySelector('.container');
const changeButton = container.querySelector('.profile__change-button');
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
const buttonCard = container.querySelector('.popup__save-card-button');





const userInfo = new UserInfo( profileName, profileDescription );
const image = new PopupWithImage(popupMain);

const changePopup = new PopupWithForm(popup, {
  submit: (data) => {
  userInfo.setUserInfo(name.value, description.value);
  changePopup.close();
  }
});


const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card-template', {handleCardClick: (data) => {
          image.open(data);
          image.setEventListeners();
      }});
      const fasd = card.createCard();
      document.querySelector('.elements').prepend(fasd);
    },
  },
  elements
); 
console.log(cardsList)
cardsList.renderCard();

const firstForm   = document.querySelector('.form');
const firstFr  = new FormValidator({
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit',
  disabledButtonClass: 'popup__save-button_nonactive',
  inputErrorClass: 'popup__input_errore',
  errorClass: 'popup__input-error_active'
}, firstForm );
firstFr.enableValidation()

changeButton.addEventListener('click', () => {
  firstFr.clear();
  const user = userInfo.getUserInfo();
  name.value = user.name;
  description.value = user.description;
  changePopup.open();
  changePopup.setEventListeners();
})


const addPopup = new PopupWithForm(popupAdd, {
  submit: (data) => {
    const card = new Card({ 
    name: `${popupMestoName.value}`, 
    link: `${popupMestoLink.value}` 
  }, '#card-template', {handleCardClick: (data) => {
          image.open(data);
      }});
      const fasd = card.createCard();
      document.querySelector('.elements').prepend(fasd);
      addPopup.close();

  }
});

const secondForm   = document.querySelector('.popup__card-form');
const secondFr  = new FormValidator({
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit',
  disabledButtonClass: 'popup__save-button_nonactive',
  inputErrorClass: 'popup__input_errore',
  errorClass: 'popup__input-error_active'
}, secondForm );
secondFr.enableValidation()

addButton.addEventListener('click', () => {
  secondFr.clear();
  addPopup.open();
  addPopup.setEventListeners();
})


