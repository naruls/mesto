import './style.css';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {Popup} from '../components/Popup.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {Card} from '../components/Card.js';
import {initialCards} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';

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
const cardTemplateId = '#card-template';

const userInfo = new UserInfo( profileName, profileDescription );
const popupImage = new PopupWithImage(popupMain);

const popupEditProfile = new PopupWithForm(popup, {
  submit: (data) => {
  userInfo.setUserInfo(name.value, description.value);
  popupEditProfile.close();
  }
});

const createCard = (item) => {
    const card = new Card(item, cardTemplateId, {handleCardClick: (data) => {
        popupImage.open(data);
    }});
    return card;
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      const cardElement = card.createCard();
      cardsList.addItem(cardElement);
    },
  },
  elements
); 

popupImage.setEventListeners();
cardsList.renderCards();

changeButton.addEventListener('click', () => {
  const user = userInfo.getUserInfo();
  name.value = user.name;
  description.value = user.description;
  popupEditProfile.open();
})

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(popupAdd, {
  submit: (data) => {
      const card = createCard({name: `${popupMestoName.value}`, 
    link: `${popupMestoLink.value}`});
      const cardElement = card.createCard();
      document.querySelector('.elements').prepend(cardElement);
      popupAddCard.close();

  }
});

addButton.addEventListener('click', () => {
  popupAddCard.open();
});

popupAddCard.setEventListeners();

const formEditProfile   = document.querySelector('.form');
const validatorEditProfile = new FormValidator({
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit',
  disabledButtonClass: 'popup__save-button_nonactive',
  inputErrorClass: 'popup__input_errore',
  errorClass: 'popup__input-error_active'
}, formEditProfile );
validatorEditProfile.enableValidation()

const formAddCard   = document.querySelector('.popup__card-form');
const validatorAddCard = new FormValidator({
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit',
  disabledButtonClass: 'popup__save-button_nonactive',
  inputErrorClass: 'popup__input_errore',
  errorClass: 'popup__input-error_active'
}, formAddCard );
validatorAddCard.enableValidation()