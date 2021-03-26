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
  popupCard.src = linkCard;
  popupCard.alt = `На фото изображён ${nameCard}`;
  popupImageName.textContent = nameCard;
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


initialCards.forEach((item)=>{
renderCard(createCard(item.name, item.link), elements);
});


saveCardButton.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  renderCard(createCard(popupMestoName.value, popupMestoLink.value), elements);
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
 