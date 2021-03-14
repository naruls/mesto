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
const saveCardButton = container.querySelector('.popup__save-card-button');
const elements = container.querySelector('.elements');
const closeButtonMain = container.querySelector('.popup__close-button_main');
const cardTemplate = document.querySelector('#card-template').content;
const popupMestoName = document.querySelector('.popup__input_mesto_name');
const popupMestoLink = document.querySelector('.popup__input_mesto_link');
const popupMain = document.querySelector('.popup_main');
const popupCard = container.querySelector('.popup__card')
const popupImageName = container.querySelector('.popup__name');
const cardElementValue = cardTemplate.querySelector('.element');

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


saveCardButton.addEventListener('click', (eventCard) => {
  eventCard.preventDefault();
  renderCard(createCard(popupMestoName.value, popupMestoLink.value), elements);
  closePopup(popupAdd);
  popupMestoName.value = "";
  popupMestoLink.value = "";
});