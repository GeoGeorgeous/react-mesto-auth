class AuthApi {
  // getCards(): получить список всех карточек с сервера в виде массива (GET)
  // getUser(): получить данные пользователя на сервере  (GET)
  // setUser(): заменить данные пользователя на сервере (PATCH)

    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _fetchButCatch(url, init) {
      return fetch(url, init)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(new Error(`${response.status}`))
      })
    }

    getUser() {
      return this._fetchButCatch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
    }

    signUpUser(userData) {
      return this._fetchButCatch(`${this._baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
    }

    signInUser(imgSrc) {
      return this._fetchButCatch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: imgSrc
        })
      });
    }

  }

  const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
      authorization: '25068d5b-79ef-423f-8b22-b9922c31ad6c',
      'Content-Type': 'application/json'
    }
  });

export default authApi
