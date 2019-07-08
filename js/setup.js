'use strict';

var ENTER_KEY = 13;
var ESC_KEY = 27;
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
  setupOpenButton.removeEventListener('click', onSetupOpenButtonClick);
  setupOpenIcon.removeEventListener('keydown', onSetupOpenIconEnterPress);
  setupCloseButton.addEventListener('click', onSetupCloseButtonClick);
  setupCloseButton.addEventListener('keydown', onExitSetupButtonEnterPress);
  window.addEventListener('keydown', onSetupEscPress);
  setupOpenIcon.setAttribute('tabindex', '-1');
  setupCloseButton.setAttribute('tabindex', '0');
}

// Закрывает окно настроек персонажа
function closeSetup() {
  setupWindow.classList.add('hidden');
  setupSimilar.classList.add('hidden');
  setupCloseButton.removeEventListener('click', onSetupCloseButtonClick);
  window.removeEventListener('keydown', onSetupEscPress);
  setupOpenButton.addEventListener('click', onSetupOpenButtonClick);
  setupOpenIcon.addEventListener('keydown', onSetupOpenIconEnterPress);
  setupOpenIcon.setAttribute('tabindex', '0');
  setupCloseButton.setAttribute('tabindex', '-1');
}

// Обработчики событий

function onSetupOpenButtonClick(evt) {
  evt.preventDefault();
  openSetup();
}

function onSetupCloseButtonClick(evt) {
  evt.preventDefault();
  closeSetup();
}

function onSetupEscPress(evt) {
  if (evt.keyCode === ESC_KEY &&
    !(setupWizardForm.querySelector('.setup-user-name') === document.activeElement)) {
    evt.preventDefault();
    closeSetup();
  }
}

function onExitSetupButtonEnterPress(evt) {
  if (evt.keyCode === ENTER_KEY) {
    evt.preventDefault();
    closeSetup();
  }
}

function onSetupOpenIconEnterPress(evt) {
  if (evt.keyCode === ENTER_KEY) {
    evt.preventDefault();
    openSetup();
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

// Добавляем обработчики событий
setupOpenButton.addEventListener('click', onSetupOpenButtonClick);
setupOpenIcon.addEventListener('keydown', onSetupOpenIconEnterPress);
wizardSetup.eyes.addEventListener('click', onEyesClick);
wizardSetup.coat.addEventListener('click', onCoatClick);
wizardSetup.fireball.addEventListener('click', onFireballClick);

// EOF
