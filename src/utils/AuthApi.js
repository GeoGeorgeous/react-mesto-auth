/* eslint-disable class-methods-use-this */
class AuthApi {
  // getCards(): получить список всех карточек с сервера в виде массива (GET)
  // getUser(): получить данные пользователя на сервере  (GET)
  // setUser(): заменить данные пользователя на сервере (PATCH)

  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetchButCatch(url, init) {
    return fetch(url, init)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`${response.status}`));
      });
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
}

const authApi = new AuthApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default authApi;
