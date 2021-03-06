# Проект Mesto React с авторизацией и регистрацией
[GH Pages](https://geogeorgeous.github.io/react-mesto-auth/)

### О чем проект?

На базе [Mesto React](https://github.com/GeoGeorgeous/mesto-react) + авторизация и регистрация.

Dev сборка с хот релоуд на **localhost:3000**
`npm run start`

Для сборки продашкн билда
`npm run build`
_________________
### Методы

Сейчас фронтэнд пользуется 2 API:
`https://auth.nomoreparties.co` — для авторизации и регистрации
`https://mesto.nomoreparties.co/v1/cohort-16` — для работы с пользовательскими данными (имя, аватар, описание) и карточками.

#### AuthApi.js:
- `authApi.verify(jwt)` — **GET** запрос с JWT токеном, проверяем валидность токена.
- `authApi.signUpUser(userData)` — **POST** запрос с почтой и паролем, регистрируем нового пользователя.
- `authApi.authorize(loginData)` — **POST** запрос с почтой и паролем, авторизовываем пользователя.
#### Api.js:
- `Api.getCards():` — **GET** запрос с JWT токеном, проверяем валидность токена.
- `Api.getUser()` — **GET** получить данные пользователя на сервере.
- `Api.setUser()` — **PATCH** заменить данные пользователя на сервере.
- `Api.uploadCard()` — **POST** добавить карточку на сервер.
- `Api.deleteCard()` — **DELETE** удалить карточку.
- `Api.setAvatar()` — **PATCH** заменить аватар.
- `Api.setLike()` — **PUT** лайкнуть карточку.
- `Api.removeLike()` — **DELETE** удалить лайк карточки.

### ToDo
В этом проекте есть много вещей, которые ещё можно доделать:

- Переиспользование готовых БЭМ блоков для форм авторизации и регистрации
- PopUp с подтверждением удаления карточки
- Валидатор для всех форм
- Ошибки при неудачной авторизации


### Какие технологии использованы?
* LocalStorage
* Route, Switch, useHistory
* API
