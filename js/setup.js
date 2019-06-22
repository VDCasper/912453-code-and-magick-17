'use strict';

var WISARDS_MAX = 4;
var setupWindow = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');

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
  var wizardElement = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item')
    .cloneNode(true);

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

// Выводим случайных волшебников на страницу
addWizards(generateRandomWizards());

// Показываем окно настроек персонажа
setupWindow.classList.remove('hidden');
setupSimilar.classList.remove('hidden');

// EOF
