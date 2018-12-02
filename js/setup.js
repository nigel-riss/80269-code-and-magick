'use strict';

/**
 * @typedef {Object} WizardPreset
 * @property {Array} names An array of names
 * @property {Array} surnames An array of surnames
 * @property {Array} coatColor An array of valid css/svg color values
 * @property {Array} eyesColor An array of valid css/svg color values
 */
var MOCKUP_PRESETS = {
  names: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  surnames: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  fireballColors: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};

var WIZARDS_COUNT = 4;

/**
 * Keycodes
 */
var KEY_ENTER = 13;
var KEY_ESCAPE = 27;


/**
 * Utility function.
 * Pulls out a random element from array or returns null if array is empty.
 * @param  {Array} array
 * @return {*|null}
 */
var pullRandomElement = function (array) {
  if (array.length) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  } else {
    return null;
  }
};


/**
 * @typedef {Object} Wizard
 * @property {string} name Wizards name
 * @property {string} coatColor Wizards coat color. Any valid css/svg color value
 * @property {string} eyesColor Wizards eyes color. Any valid css/svg color value
 */

/**
 * Generating a wizard object from presets data
 * @param {WizardPreset} mockupPresets
 * @return {Wizard}
 */
var generateWizardData = function (mockupPresets) {
  var wizardData = {};
  wizardData.name = pullRandomElement(mockupPresets.names) + ' ' + pullRandomElement(mockupPresets.surnames);
  wizardData.coatColor = pullRandomElement(mockupPresets.coatColors);
  wizardData.eyesColor = pullRandomElement(mockupPresets.eyesColors);
  return wizardData;
};


/**
 * Returns an array of wizards mockup data.
 * @param  {number} arrayLength
 * @return {Array.<Wizard>}
 */
var generateWizardArray = function (arrayLength) {
  var wizards = [];
  for (var i = 0; i < arrayLength; i++) {
    wizards.push(generateWizardData(MOCKUP_PRESETS));
  }

  return wizards;
};


/**
 * Rendering a wizard block
 * @param  {Wizard} wizardData
 * @param  {HTMLElement} template
 * @return {HTMLElement}
 */
var renderWizard = function (wizardData, template) {
  var wizardBlock = template.cloneNode(true);
  var wizardBlockLabel = wizardBlock.querySelector('.setup-similar-label');
  var wizardBlockCoat = wizardBlock.querySelector('.wizard-coat');
  var wizardBlockEyes = wizardBlock.querySelector('.wizard-eyes');
  wizardBlockLabel.textContent = wizardData.name;
  wizardBlockCoat.style.fill = wizardData.coatColor;
  wizardBlockEyes.style.fill = wizardData.eyesColor;
  return wizardBlock;
};


/**
 * Rendering a document fragment from wizards data
 * @param {Array.<Wizard>} wizardsDataArray
 * @return {DocumentFragment}
 */
var renderWizardsFragment = function (wizardsDataArray) {
  var wizardBlockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsDataArray.length; i++) {
    var wizardBlock = renderWizard((wizardsDataArray[i]), wizardBlockTemplate);
    fragment.appendChild(wizardBlock);
  }

  return fragment;
};


/**
 * Showing wizards container
 */
var showSetupSimilar = function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
};

// executing setup flow
// showSetup();
var randomWizards = generateWizardArray(WIZARDS_COUNT);
var wizardsFragment = renderWizardsFragment(randomWizards);
var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(wizardsFragment);
showSetupSimilar();

/**
 * Module 4 Task 1
 */

/**
 * Showing setup window
 */
var showSetup = function () {
  var setupBlock = document.querySelector('.setup');
  setupBlock.classList.remove('hidden');
};

/**
 * Hiding setup window
 */
var hideSetup = function () {
  var setupBlock = document.querySelector('.setup');
  setupBlock.classList.add('hidden');
};

/**
 * Handling user icon click
 */
var setupOpenBtn = document.querySelector('.setup-open');
setupOpenBtn.addEventListener('click', function () {
  showSetup();
});

/**
 * Handling setup window cross click
 */
var setupCloseBtn = document.querySelector('.setup-close');
setupCloseBtn.addEventListener('click', function () {
  hideSetup();
});

/**
 * Handling keyboard :)
 */
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupUserNameInput = document.querySelector('.setup-user-name');
document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case (KEY_ENTER):
      if (document.activeElement === setupOpenIcon) {
        showSetup();
      } else if (document.activeElement === setupCloseBtn) {
        hideSetup();
      }
      break;
    case (KEY_ESCAPE):
      if (document.activeElement !== setupUserNameInput) {
        hideSetup();
      }
      break;
  }
});


/**
 * Validating form input
 */
setupUserNameInput.addEventListener('invalid', function () {
  if (setupUserNameInput.validity.tooShort) {
    setupUserNameInput.setCustomValidity('Минимальная длина имени персонажа — 2 символа');
  } else if (setupUserNameInput.validity.tooLong) {
    setupUserNameInput.setCustomValidity('Максимальная длина имени персонажа — 25 символов');
  } else if (setupUserNameInput.validity.valueMissing) {
    setupUserNameInput.setCustomValidity('Необходимо ввести имя персонажа');
  } else {
    setupUserNameInput.setCustomValidity('');
  }
});

setupUserNameInput.addEventListener('input', function (e) {
  var target = e.target;
  if (target.value.length < 2) {
    setupUserNameInput.setCustomValidity('Минимальная длина имени персонажа — 2 символа');
  } else {
    setupUserNameInput.setCustomValidity('');
  }
});


/**
 * Generating a function which returns one element of an array
 * one by one in repeating sequence
 * @param {Array} array
 * @return {Function}
 */
var generateRotation = function (array) {
  var clonedArray = array.slice(0);
  var index = 1;

  return function () {
    var element = clonedArray[index];
    index++;
    if (index === clonedArray.length) {
      index = 0;
    }
    return element;
  };
};

/**
 * Changing coat color on click
 */
var rotateCoatColor = generateRotation(MOCKUP_PRESETS.coatColors);
var heroWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var coatInput = document.querySelector('input[name="coat-color"]');
heroWizardCoat.addEventListener('click', function () {
  var newCoatColor = rotateCoatColor();
  heroWizardCoat.style.fill = newCoatColor;
  coatInput.value = newCoatColor;
});

/**
 * Changing eyes color on click
 */
var rotateEyesColor = generateRotation(MOCKUP_PRESETS.eyesColors);
var heroWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var eyesInput = document.querySelector('input[name="eyes-color"]');
heroWizardEyes.addEventListener('click', function () {
  var newEyesColor = rotateEyesColor();
  heroWizardEyes.style.fill = newEyesColor;
  eyesInput.value = newEyesColor;
});

/**
 * Changing fireball color on click
 */
var rotateFireballColor = generateRotation(MOCKUP_PRESETS.fireballColors);
var heroWizardFireball = document.querySelector('.setup-fireball-wrap');
var fireballInput = document.querySelector('input[name="fireball-color"]');
heroWizardFireball.addEventListener('click', function () {
  var newFireballColor = rotateFireballColor();
  heroWizardFireball.style.backgroundColor = newFireballColor;
  fireballInput.value = newFireballColor;
});
