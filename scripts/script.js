let container = document.querySelector('.container');
let changeButton = container.querySelector('.profile__change-button');
let resetButton = container.querySelector('.popup__close-button');
let saveButton = container.querySelector('.popup__save-button');
let popup = container.querySelector('.popup_hidden');
let profileName = container.querySelector('.profile__name');
let profileDescription = container.querySelector('.profile__description');

function popupShow() {
let name = container.querySelector('.popup__name');
let description = container.querySelector('.popup__description');
name.value= profileName.innerHTML;
description.value= profileDescription.innerHTML;
popup.classList.add('popup_active');
}

changeButton.addEventListener('click', popupShow); 

function popupHidde() {
popup.classList.remove('popup_active');
}

resetButton.addEventListener('click', popupHidde); 

function popupSave() {
let name = container.querySelector('.popup__name');
let description = container.querySelector('.popup__description');
container.querySelector('.profile__name').innerHTML="";
container.querySelector('.profile__description').innerHTML="";
profileName.insertAdjacentText('beforeend', `${name.value}`);
profileDescription.insertAdjacentText('beforeend', `${description.value}`);
popup.classList.remove('popup_active');
}

saveButton.addEventListener('click', popupSave); 

