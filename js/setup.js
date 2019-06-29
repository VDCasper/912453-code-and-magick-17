'use strict';

var WISARDS_MAX = 4;
var setupWindow = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarWizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');

var setupOpenButton = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupCloseButton = document.querySelector('.setup-close');
var setupWizardForm = document.querySelector('.setup-wizard-form');
var setupSubmitButton = document.querySelector('.setup-submit');

// Изображение персонажа в окне настроек
var wizardSetup = {
  eyes: document.querySelector('.setup-wizard .wizard-eyes'),
  coat: document.querySelector('.setup-wizard .wizard-coat'),
  fireball: document.querySelector('.setup-fireball-wrap')
};

// Инициализируем набор возможных свойств персонажей
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var surnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// Возвращает случайный элемент массива
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Генерирует массив волшебников со случайними свойствами
function generateRandomWizards() {
  var randomWizardsArray = [];
  for (var i = 0; i < WISARDS_MAX; i++) {
    randomWizardsArray[i] = {
      name: getRandomArrayElement(names) + ' ' + getRandomArrayElement(surnames),
      coatColor: getRandomArrayElement(coatColors),
      eyesColor: getRandomArrayElement(eyesColors)
    };
  }
  return randomWizardsArray;
}

// Создает DOM-элемент из объекта
function getWizardItem(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

// Добавляет массив волшебников на страницу
function addWizards(wizardsArray) {
  var similarWizardsList = document.querySelector('.setup-similar-list');

  for (var i = 0; i < wizardsArray.length; i++) {
    similarWizardsList.appendChild(getWizardItem(wizardsArray[i]));
  }
}

// Открывает окно настроек персонажа
function openSetup() {
  setupWindow.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');
  setupCloseButton.addEventListener('click', onSetupWindowClose);
  setupOpenButton.removeEventListener('click', onSetupWindowOpen);
  setupOpenIcon.setAttribute('tabindex', '-1');
  setupCloseButton.setAttribute('tabindex', '0');
}

// Закрывает окно настроек персонажа
function closeSetup() {
  setupWindow.classList.add('hidden');
  setupSimilar.classList.add('hidden');
  setupCloseButton.removeEventListener('click', onSetupWindowClose);
  setupOpenButton.addEventListener('click', onSetupWindowOpen);
  setupOpenIcon.setAttribute('tabindex', '0');
  setupCloseButton.setAttribute('tabindex', '-1');
}

// Обработчики событий

function onSetupWindowOpen(evt) {
  evt.preventDefault();
  openSetup();
}

function onSetupWindowClose(evt) {
  evt.preventDefault();
  closeSetup();
}

function onKeyDown(evt) {
  switch (evt.keyCode) {
    case 13:
      if (setupOpenIcon === document.activeElement) {
        evt.preventDefault();
        openSetup();
      }
      if (setupCloseButton === document.activeElement) {
        evt.preventDefault();
        closeSetup();
      }
      break;
    case 27:
      if (
        !setupWizardForm.contains(document.activeElement) &&
        !setupWindow.classList.contains('hidden')
      ) {
        evt.preventDefault();
        closeSetup();
      }
      break;
  }
}

function onEyesClick(evt) {
  evt.target.style.fill = getRandomArrayElement(eyesColors);
}

function onCoatClick(evt) {
  evt.target.style.fill = getRandomArrayElement(coatColors);
}

function onFireballClick(evt) {
  evt.target.style.backgroundColor = getRandomArrayElement(fireballColors);
}

// Выводим случайных волшебников на страницу
addWizards(generateRandomWizards());

// Задаем недостающие атрибуты формы настройки персонажа
setupOpenIcon.setAttribute('tabindex', '0');
setupWizardForm.setAttribute('method', 'POST');
setupWizardForm.setAttribute('action', 'https://js.dump.academy/code-and-magick');
setupSubmitButton.setAttribute('type', 'submit');

// Добавляем обработчики событий
setupOpenButton.addEventListener('click', onSetupWindowOpen);
window.addEventListener('keydown', onKeyDown);
wizardSetup.eyes.addEventListener('click', onEyesClick);
wizardSetup.coat.addEventListener('click', onCoatClick);
wizardSetup.fireball.addEventListener('click', onFireballClick);

// EOF
