export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'GET',
    headers: this._headers
  })
} 

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Ошибка ${res.status}`);
    });
  }

   setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarDescription
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  postCard(data) {
  return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.mestoName,
        link: data.mestoDescription
      })
    })
  }

  likeCard(data) {
  return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Ошибка ${res.status}`);
    });
  }

  dislikeCard(data) {
  return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Ошибка ${res.status}`);
    });
  }
  
  deleteCard(data) {
  return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else return Promise.reject(`Ошибка ${res.status}`);
    });
  }
}


