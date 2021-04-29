export class UserInfo {
  constructor( userName, userDescription ) {
    this._name = userName;
    this._description = userDescription;
  }

  getUserInfo() {
    const info = {
      name: this._name.textContent,
      description: this._description.textContent
    };
    return info;
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}