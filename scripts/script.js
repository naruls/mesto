let container = document.querySelector('.container');
let changeButton = container.querySelector('.profile__change-button');
let resetButton = container.querySelector('.popup__close-button-change');
let resetButtonAdd = container.querySelector('.popup__close-button-add');
let saveButton = container.querySelector('.popup__form');
let popup = container.querySelector('.popup_change');
let profileName = container.querySelector('.profile__name');
let profileDescription = container.querySelector('.profile__description');
let name = container.querySelector('.popup__input_user_name');
let description = container.querySelector('.popup__input_user_description');
let addButton = container.querySelector('.profile__add-button');
let popupAdd = container.querySelector('.popup_add');
let saveCardButton = container.querySelector('.popup__save-card-button');
const elements = container.querySelector('.elements');
let closeButtonMain = container.querySelector('.popup__close-button_main');

function popupShow() {
name.value= profileName.textContent;
description.value= profileDescription.textContent;
popup.classList.add('popup_active');
}

changeButton.addEventListener('click', popupShow); 

function popupHidde() {
popup.classList.remove('popup_active');
}

resetButton.addEventListener('click', popupHidde); 

function popupSave(evt) {
evt.preventDefault();
container.querySelector('.profile__name').textContent="";
container.querySelector('.profile__description').textContent="";
profileName.insertAdjacentText('beforeend', `${name.value}`);
profileDescription.insertAdjacentText('beforeend', `${description.value}`);
popup.classList.remove('popup_active');
}

saveButton.addEventListener('submit', popupSave); 



function popupShowAdd() {
popupAdd.classList.add('popup_active');
}

addButton.addEventListener('click', popupShowAdd); 

function popupHiddeAdd() {
popupAdd.classList.remove('popup_active');
}

resetButtonAdd.addEventListener('click', popupHiddeAdd); 

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function startAddCard(){
  for(i=0;i<=5;i++){
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

cardElement.querySelector('.element__image').style.backgroundImage = `url('${initialCards[i].link}')`;
cardElement.querySelector('.element__name').textContent = initialCards[i].name; 

cardElement.querySelector('.element__like-button').addEventListener('click', function (eventLike) {
  eventLike.target.classList.toggle('element__like-button_active');
})

cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
  const deleteElement = cardElement.closest('.element');
  deleteElement.remove();
})

cardElement.querySelector('.element__image').addEventListener('click', function (eventOpenImage) {
  container.querySelector('.popup__main').classList.add('popup_active');
  container.querySelector('.popup__card').src = `${eventOpenImage.target.style.backgroundImage.slice(5, -2)}`;
  container.querySelector('.popup__name').textContent = cardElement.querySelector('.element__name').textContent;
})
elements.prepend(cardElement);
}
}
startAddCard();



function addCard (nameCard, linkCard){
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
cardElement.querySelector('.element__image').style.backgroundImage = `url('${linkCard}')`;
cardElement.querySelector('.element__name').textContent = nameCard;

cardElement.querySelector('.element__like-button').addEventListener('click', function (eventLike) {
  eventLike.target.classList.toggle('element__like-button_active');
})
cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
  const deleteElement = cardElement.closest('.element');
  deleteElement.remove();
})

cardElement.querySelector('.element__image').addEventListener('click', function (eventOpenImage) {
  container.querySelector('.popup__main').classList.add('popup_active');
  container.querySelector('.popup__card').src = `${eventOpenImage.target.style.backgroundImage.slice(5, -2)}`;
  container.querySelector('.popup__name').textContent = cardElement.querySelector('.element__name').textContent;
})

elements.prepend(cardElement);

popupAdd.classList.remove('popup_active');
}

saveCardButton.addEventListener('click', function (eventCard) {
  eventCard.preventDefault();
  const nameCard = document.querySelector('.popup__input_mesto_name');
  const linkCard = document.querySelector('.popup__input_mesto_link');

  addCard(nameCard.value, linkCard.value);

});

function popupMainHidde() {
container.querySelector('.popup__main').classList.remove('popup_active');
}

closeButtonMain.addEventListener('click', popupMainHidde); 
