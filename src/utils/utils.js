/* ---------- Дефолтные карточоки ---------- */
import pokrovkaImage from '../images/card__Pokrovka.jpg';
import TSUMImage from '../images/card__TeatralnyjProezd.jpg';
import MoscowCityImage from '../images/card__MoscowCity.jpg';
import MyasnitskayaImage from '../images/card__Myasnickaya.jpg'
import ChertanovoImage from '../images/card__Chertanovo.jpg';
import DobryninskayaImage from '../images/card__Dobryninskaya.jpg';

// export const initialCards = [
//   {
//       title: 'Покровка',
//       link: pokrovkaImage
//   },
//   {
//       title: 'ЦУМ',
//       link: TSUMImage
//   },
//   {
//       title: 'Москва-сити',
//       link: MoscowCityImage
//   },
//   {
//       title: 'Мясницкая',
//       link: MyasnitskayaImage
//   },
//   {
//       title: 'Чертаново',
//       link: ChertanovoImage
//   },
//   {
//       title: 'метро Добрынинская',
//       link: DobryninskayaImage
//   }
// ];

// /* ---------- Дефолтный юзер ---------- */
// export const initialUser = {
//   username: 'Жак-Ив Кусто',
//   description: 'Исследователь океана'
// }

/* ---------- Конфигурация для FormValidator.js и PopupWithForm.js ---------- */
export const config = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClass: 'popup__form-item_error'
}

// Аккаунт — Модальное окно
export const accountPopUp = document.querySelector('.popup[data-type="account"]'); // [Аккаунт] Модальное окно
export const accountEditButton = document.querySelector('.profile__edit-button'); // [Аккаунт] Кнопка редактирования профиля
// Аккаунт — Форма
export const accountForm = document.forms.account;
export const accountInputName = accountForm.elements.username;
export const accountInputDesc = accountForm.elements.description;

// Место — Модальное окно
export const placePopUp = document.querySelector('.popup[data-type="place"]'); // [Место] Модальное окно
export const placeAddButton = document.querySelector('.profile__add-button'); // [Место] Кнопка добавления нового места
// Место — Форма
export const placeForm = document.forms.place; // Форма Место
export const placeInputTitle = placeForm.elements.title; // Инпут - название места
export const placeInputLink = placeForm.elements.link; // Инпут - ссылка на изображение

// Подтверждение удаления — Модальное окно
export const confirmPopUp = document.querySelector('.popup[data-type="confirm-delete"]');
export const avatarForm = document.forms.avatar;

// Редактирование аватара — Модальное окно
export const avatarPopUp = document.querySelector('.popup[data-type="avatar"]');
export const changeAvatarBtn = document.querySelector('.profile__avatar');
// export const avatarElement = document.querySelector('.profile__avatar-image');

// Имя и Описание профиля
export const userElements = {
  name: document.querySelector('.profile__name'), // Имя профиля
  about: document.querySelector('.profile__description'), // Описание Профиля
  avatar: document.querySelector('.profile__avatar-image')
}

// Lightbox
export const lightbox = document.querySelector('.popup[data-type="lightbox"]');

// Получаем контейнер ul для всех карточек
export const cardsContainer = document.querySelector('.cards__items');
