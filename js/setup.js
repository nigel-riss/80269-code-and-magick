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
  ]
};

var WIZARDS_COUNT = 4;


/**
 * Utility function.
 * Pulls out a random element from array or returns null if array is empty.
 * @param  {Array} array
 * @return {*|null}
 */
var pullRandomElement = function (array) {
  if (array.length) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex, 1)[0];
  } else {
    return null;
  }
};


/**
 *  Showing setup window
 */
var showSetup = function () {
  var setupBlock = document.querySelector('.setup');
  setupBlock.classList.remove('hidden');
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
showSetup();
var randomWizards = generateWizardArray(WIZARDS_COUNT);
var wizardsFragment = renderWizardsFragment(randomWizards);
var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(wizardsFragment);
showSetupSimilar();
