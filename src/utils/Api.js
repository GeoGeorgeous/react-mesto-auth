/* eslint-disable class-methods-use-this */
class Api {
// getCards(): получить список всех карточек с сервера в виде массива (GET)
// getUser(): получить данные пользователя на сервере  (GET)
// setUser(): заменить данные пользователя на сервере (PATCH)
// uploadCard(): добавить карточку на сервер (POST)
// deleteCard(): удалить карточку (DELETE)
// setAvatar(): заменить аватар (PATCH)
// setLike(): залайкать карточку (PUT)
// removeLike(): удалить лайк карточки (DELETE)

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._jwt;
  }

  setToken(JWT) {
    this._jwt = JWT;
  }

  _fetchButCatch(url, init) {
    return fetch(url, init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`${response.status}`));
      })
      .catch((err) => { console.log(err); });
  }

  verify(JWT) {
    return this._fetchButCatch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    });
  }

  signUpUser(email, password) {
    return this._fetchButCatch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    });
  }

  authorize(email, password) {
    return this._fetchButCatch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email, password,
      }),
    })
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
        return data;
      })
      .catch((err) => { console.log(err); });
  }

  getUser() {
    return this._fetchButCatch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  setUser(userData) {
    return this._fetchButCatch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
  }

  setAvatar(imgSrc) {
    return this._fetchButCatch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: imgSrc,
      }),
    });
  }

  uploadCard(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    });
  }

  getCards() {
    return this._fetchButCatch(`${this._baseUrl}/cards`, {
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  deleteCard(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return this.removeLike(card);
    }

    return this.setLike(card);
  }

  setLike(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  removeLike(card) {
    return this._fetchButCatch(`${this._baseUrl}/cards/${card._id}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this._jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    Authorization: 'Bearer',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
