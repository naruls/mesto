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

function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', escapeButton);
};

function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', escapeButton);
};

function escapeButton(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_active'));
  }}

changeButton.addEventListener('click', shiowPopupProfile); 


saveButton.addEventListener('submit', savePopup); 


addButton.addEventListener('click', (evt) =>{
openPopup(popupAdd);
}); 


saveCardButton.addEventListener('submit', (evt) =>{
  evt.preventDefault();
    const card = new Card({
    name: `${popupMestoName.value}`,
    link: `${popupMestoLink.value}`
  }, '#card-template');
  const fasd = card.createCard();
  document.querySelector('.elements').prepend(fasd);
  closePopup(popupAdd);
  popupMestoName.value = "";
  popupMestoLink.value = "";
});


 const popups = document.querySelectorAll('.popup')

      popups.forEach((popup) => {
          popup.addEventListener('click', (evt) => {
              if (evt.target.classList.contains('popup__background')) {
                  closePopup(popup)
              }
              if (evt.target.classList.contains('popup__close-image')) {
                closePopup(popup)
              }
          })
      })

import {Card} from './Card.js';

 initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');
    const fasd = card.createCard();
    document.querySelector('.elements').prepend(fasd);
});