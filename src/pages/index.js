import './style.css';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {popupClass} from '../components/popup.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Card} from '../components/Card.js';
import {initialCards} from '../scripts/initial-сards.js';
import {FormValidator} from '../components/validate.js';

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


const validationSettings = {
inputSelector: '.popup__input',
  buttonSelector: '.popup__submit',
  disabledButtonClass: 'popup__save-button_nonactive',
  inputErrorClass: 'popup__input_errore',
  errorClass: 'popup__input-error_active'
}


const userInfo = new UserInfo( profileName, profileDescription );
const image = new PopupWithImage(popupMain);

const changePopup = new PopupWithForm(popup, {
  submit: (data) => {
  userInfo.setUserInfo(data);
    console.log(data);
  changePopup.close();
  }
});

function instanceCard(item){
   const card = new Card(item, '#card-template', {handleCardClick: (data) => {
          image.open(data);
      }});
   return card.createCard();
}
const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const newCard = instanceCard(item);
      cardsList.addItem(newCard);
    },
  },
  elements
); 
image.setEventListeners();
console.log(cardsList)
cardsList.renderCard();

const UserinfoForm   = document.querySelector('.form');
const validateUserinfoForm  = new FormValidator(validationSettings, UserinfoForm );
validateUserinfoForm.enableValidation()

changeButton.addEventListener('click', () => {
  validateUserinfoForm.clear();
  const user = userInfo.getUserInfo();
  name.value = user.name;
  description.value = user.description;
  changePopup.open();
})
changePopup.setEventListeners();


const addPopup = new PopupWithForm(popupAdd, {
  submit: (data) => {
      const newCard = instanceCard({ name: `${popupMestoName.value}`, link: `${popupMestoLink.value}`});
      cardsList.addItem(newCard);
      addPopup.close();
  }
});

const CardAddForm   = document.querySelector('.popup__card-form');
const validateCardAddForm  = new FormValidator(validationSettings, CardAddForm );
validateCardAddForm.enableValidation()

addButton.addEventListener('click', () => {
  validateCardAddForm.clear();
  addPopup.open();
})
  addPopup.setEventListeners();


