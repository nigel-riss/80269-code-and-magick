'use strict';

// 01. showing setup block
var showSetup = function () {
  var setupBlock = document.querySelector('.setup');
  setupBlock.classList.remove('hidden');
};

// 02. generating mockup data
var generateWizardData = function () {
  var mockupPresets = {
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

  var pullRandomElement = function (array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex, 1)[0];
  };

  var generateWizard = function () {
    var wizardData = {};
    wizardData.name = pullRandomElement(mockupPresets.names) + ' ' + pullRandomElement(mockupPresets.surnames);
    wizardData.coatColor = pullRandomElement(mockupPresets.coatColors);
    wizardData.eyesColor = pullRandomElement(mockupPresets.eyesColors);
    return wizardData;
  };

  var fourWizards = [];
  for (var i = 0; i < 4; i++) {
    fourWizards.push(generateWizard());
  }

  return fourWizards;
};

// 03. generating random wizards blocks
var renderWizardBlocks = function (wizardsData) {
  var wizardBlockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var generateWizard = function (wizardData) {
    var wizardBlock = wizardBlockTemplate.cloneNode(true);
    var wizardBlockLabel = wizardBlock.querySelector('.setup-similar-label');
    var wizardBlockCoat = wizardBlock.querySelector('.wizard-coat');
    var wizardBlockEyes = wizardBlock.querySelector('.wizard-eyes');

    wizardBlockLabel.textContent = wizardData.name;
    wizardBlockCoat.style.fill = wizardData.coatColor;
    wizardBlockEyes.style.fill = wizardData.eyesColor;
    return wizardBlock;
  };

  var wizardBlocks = [];
  for (var i = 0; i < wizardsData.length; i++) {
    wizardBlocks.push(generateWizard(wizardsData[i]));
  }

  return wizardBlocks;
};

// 04. rendering all wizard blocks info one fragment
var renderWizardsFragment = function (wizardElements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardElements.length; i++) {
    fragment.appendChild(wizardElements[i]);
  }
  return fragment;
};

// 05. showing wizards container
var showSetupSimilar = function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
};

// executing setup flow
showSetup();
var randomWizardsData = generateWizardData();
var renderedWizardBlocks = renderWizardBlocks(randomWizardsData);
var wizardsFragment = renderWizardsFragment(renderedWizardBlocks);
var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(wizardsFragment);
showSetupSimilar();
