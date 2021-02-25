let container = document.querySelector('.container');
let changeButton = container.querySelector('.profile__change-button');
let resetButton = container.querySelector('.popup__close-button');
let saveButton = container.querySelector('.popup__form');
let popup = container.querySelector('.popup_hidden');
let profileName = container.querySelector('.profile__name');
let profileDescription = container.querySelector('.profile__description');
let name = container.querySelector('.popup__input_user_name');
let description = container.querySelector('.popup__input_user_description');

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

