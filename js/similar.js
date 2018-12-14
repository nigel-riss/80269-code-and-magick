'use strict';

/**
 * Drawing of similar wizards
 */
(function () {

  var WIZARDS_COUNT = 4;

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
    wizardData.name = window.utils.getRandomElement(mockupPresets.names) + ' ' + window.utils.getRandomElement(mockupPresets.surnames);
    wizardData.coatColor = window.utils.getRandomElement(mockupPresets.coatColors);
    wizardData.eyesColor = window.utils.getRandomElement(mockupPresets.eyesColors);
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
      wizards.push(generateWizardData(window.character.PRESETS));
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


  var randomWizards = generateWizardArray(WIZARDS_COUNT);
  var wizardsFragment = renderWizardsFragment(randomWizards);
  var similarListElement = document.querySelector('.setup-similar-list');
  similarListElement.appendChild(wizardsFragment);
  showSetupSimilar();

})();
