export class UserInfo { 
  constructor(userName, userDescription, userAvatar) { 
    this._name = userName; 
    this._about = userDescription; 
    this._avatar = userAvatar;
  } 
 
  getUserInfo() { 
    const info = { 
      name: this._name.textContent, 
      about: this._about.textContent 
    }; 
    return info; 
  } 
 

  setUserInfo(data) { 
    this._name.textContent = data.name; 
    this._about.textContent = data.about; 
    this._avatar.src = data.avatar;
  } 
} 