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

function popupShow() {
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


function startAddCard(nameCard, linkCard){
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
const cardImage = cardElement.querySelector('.element__image');
const cardName = cardElement.querySelector('.element__name');

cardImage.style.backgroundImage = `url('${linkCard}')`;
cardName.textContent = nameCard; 


cardElement.querySelector('.element__like-button').addEventListener('click', likefunction);

cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
  const deleteElement = cardElement.closest('.element');
  deleteElement.remove();
})

cardImage.addEventListener('click', function (eventOpenImage) {
  openPopup(popupMain);
  popupCard.src = `${eventOpenImage.target.style.backgroundImage.slice(5, -2)}`;
  popupImageName.textContent = cardName.textContent;
});
return cardElement;
}


function renderCard(data, wrap){
  wrap.prepend(data);
}


function likefunction(likeEvent) {
  likeEvent.target.classList.toggle('element__like-button_active');
};

function openPopup(popup) {
  popup.classList.add('popup_active');
};
function closePopup(popup) {
  popup.classList.remove('popup_active');
};


changeButton.addEventListener('click', popupShow); 


resetButton.addEventListener('click', function(){
closePopup(popup);
}); 

saveButton.addEventListener('submit', savePopup); 


addButton.addEventListener('click', function(){
openPopup(popupAdd);
}); 


resetButtonAdd.addEventListener('click', function(){
closePopup(popupAdd);
}); 

initialCards.forEach((item, i)=>{
renderCard(startAddCard(initialCards[i].name, initialCards[i].link), elements);
});

closeButtonMain.addEventListener('click', function(){
closePopup(popupMain);
}); 


saveCardButton.addEventListener('click', function (eventCard) {
  eventCard.preventDefault();
  renderCard(startAddCard(popupMestoName.value, popupMestoLink.value), elements);
  closePopup(popupAdd);
  popupMestoName.value = "";
  popupMestoLink.value = "";
});