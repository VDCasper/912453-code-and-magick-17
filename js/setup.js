'use strict';

// Объявляем объекты из DOM
var setupWindow = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var wizardTemplate = document
  .querySelector('#similar-wizard-template')
  .content.querySelector('.setup-similar-item');
var similarWizardsList = document.querySelector('.setup-similar-list');

// Инициализируем набор возможных свойств персонажей
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария', 'Кристоф',
  'Виктор', 'Юлия',
  'Люпита',
  'Вашингтон'
];

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

// Массив для
var randomWizardsArray = [];

// Возвращает случайный элемент массива
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Генерирует объект волшебника со случайними свойствами
function getRandomWizard() {
  return {
    name: getRandomArrayElement(names) + ' ' + getRandomArrayElement(surnames),
    coatColor: getRandomArrayElement(coatColors),
    eyesColor: getRandomArrayElement(eyesColors)
  };
}

// Создает DOM-элемент из объекта
function getWizardItem(element, wizard) {
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return element;
}

// Добавляет в указанный список (объект DOM) элементы из массива волшебников
function addElementsToList(wizardsList, wizardsArray) {
  for (var i = 0; i < wizardsArray.length; i++) {
    // var wizardItem = getWizardItem(wizardTemplate.cloneNode(true), getRandomWizard());
    var wizardItem = getWizardItem(wizardTemplate.cloneNode(true), wizardsArray[i]);
    wizardsList.appendChild(wizardItem);
  }
}

// Добавляем в массим 4-х случайных волшебников
for (var i = 0; i < 4; i++) {
  randomWizardsArray[i] = getRandomWizard();
}

addElementsToList(similarWizardsList, randomWizardsArray);

// Показываем окно настроек персонажа
setupWindow.classList.remove('hidden');
setupSimilar.classList.remove('hidden');

// EOF
