import './style.css'; 
import {Api} from '../components/Api.js'; 
import {Section} from '../components/Section.js'; 
import {UserInfo} from '../components/UserInfo.js'; 
import {popupClass} from '../components/popup.js'; 
import {PopupWithForm} from '../components/PopupWithForm.js'; 
import {PopupWithImage} from '../components/PopupWithImage.js'; 
import {PopupWithConfirm} from '../components/PopupWithConfirm.js'; 
import {Card} from '../components/Card.js'; 
import {initialCards} from '../scripts/initial-сards.js'; 
import {FormValidator} from '../components/validate.js'; 
 
const container = document.querySelector('.container'); 
const changeButton = container.querySelector('.profile__change-button'); 
const saveButton = container.querySelector('.popup__form'); 
const popup = container.querySelector('.popup'); 
const profileName = container.querySelector('.profile__name'); 
const profileDescription = container.querySelector('.profile__description');
const profileAvatar = container.querySelector('.profile__avatar');
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
const avatarPopup = container.querySelector('.popup_avatar'); 
const avatarButton = container.querySelector('.profile__frontground');
const confirmPopup = container.querySelector('.popup_confirm'); 
let chosenCard = '';
let myId = '';

const validationSettings = { 
inputSelector: '.popup__input', 
  buttonSelector: '.popup__submit', 
  disabledButtonClass: 'popup__save-button_nonactive', 
  inputErrorClass: 'popup__input_errore', 
  errorClass: 'popup__input-error_active' 
}  
 
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar); 
const image = new PopupWithImage(popupMain); 

  const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: 'ab7ed9bf-6fe7-40d5-8eb5-654a79ccb9d8',
    'Content-Type': 'application/json'
  }
}); 

api.getUserInfo()
  .then(res => res.json())
  .then((data)=>{
    userInfo.setUserInfo(data);
    myId = data._id;
  })
  .catch((err) => {
    console.log(err);
  })

api.getInitialCards()
  .then(res => res.json())
  .then((data)=>{
    console.log(data)
    cardsList.renderCard(data);
  })
  .catch((err) => {
    console.log(err);
  })
 
const changePopup = new PopupWithForm(popup, { 
  submit: (data) => { 
      changePopup.render(true);
      api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        changePopup.render(false);
        changePopup.close();
      })
  } 
}); 
 
function instanceCard(item){ 
   const card = new Card(item, '#card-template', {
    handleCardClick: (data) => { 
          image.open(data); 
      },
    setLike: (data) => { 
        api.likeCard(data)
        .then((data) => {
          card.likeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
      },
    removeLike: (data) => { 
        console.log(data)
        api.dislikeCard(data)
        .then((data) => {
          card.likeCount(data);
        })
        .catch((err) => {
          console.log(err);
        })
    
    },
    deleteMyCard: () => { 
      chosenCard = card;
      popupConfirm.open(item); 
      }
    }, myId
    ); 
   return card.createCard(); 
} 

const cardsList = new Section({ 
    renderer: (item) => { 
      const newCard = instanceCard(item); 
      cardsList.addItem(newCard); 
    }, 
  }, 
  elements 
);  
image.setEventListeners(); 
 
const addPopup = new PopupWithForm(popupAdd, { 
  submit: (data) => { 
    addPopup.render(true);
    api.postCard(data)
      .then(res => res.json())
      .then((res) => {
        const card = instanceCard(res);
        cardsList.addItem(card);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addPopup.render(false);
        addPopup.close()
      })
  } 
}); 

const popupAvatar = new PopupWithForm(avatarPopup, {
  submit: (data) => {
    popupAvatar.render(true);
    api.setUserAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.render(false);
        popupAvatar.close();
      })
  }
})

const popupConfirm = new PopupWithConfirm(confirmPopup, {
  submit: (data) => {
    console.log(data)
    api.deleteCard(data)
      .then(() => {
        chosenCard.deleteCard();
      })
      .then(() => {
        chosenCard = '';
        popupConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
})

popupConfirm.setEventListeners(); 

const userinfoForm   = document.querySelector('.form'); 
const validateUserinfoForm  = new FormValidator(validationSettings, userinfoForm ); 
validateUserinfoForm.enableValidation() 
changeButton.addEventListener('click', () => { 
  validateUserinfoForm.clear(); 
  const user = userInfo.getUserInfo(); 
  name.value = user.name; 
  description.value = user.about; 
  changePopup.open(); 
}) 
changePopup.setEventListeners(); 

const userAvatarForm   = document.querySelector('.popup__avatar-form'); 
const validateuserAvatarForm  = new FormValidator(validationSettings, userAvatarForm ); 
validateuserAvatarForm.enableValidation() 
avatarButton.addEventListener('click', () => { 
  validateuserAvatarForm.clear(); 
  popupAvatar.open(); 
}) 

popupAvatar.setEventListeners(); 

 
const cardAddForm   = document.querySelector('.popup__card-form'); 
const validateCardAddForm  = new FormValidator(validationSettings, cardAddForm ); 
validateCardAddForm.enableValidation() 
addButton.addEventListener('click', () => { 
  validateCardAddForm.clear(); 
  addPopup.open(); 
}) 
  addPopup.setEventListeners(); 
