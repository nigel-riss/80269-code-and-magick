'use strict';

/**
 * Character setup
 */
(function () {

  /**
   * @typedef {Object} WizardPreset
   * @property {Array} names An array of names
   * @property {Array} surnames An array of surnames
   * @property {Array} coatColor An array of valid css/svg color values
   * @property {Array} eyesColor An array of valid css/svg color values
   */
  var PRESETS = {
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


  /**
   * Changing coat color on click
   */
  var rotateCoatColor = window.utils.generateRotation(PRESETS.coatColors);
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
  var rotateEyesColor = window.utils.generateRotation(PRESETS.eyesColors);
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
  var rotateFireballColor = window.utils.generateRotation(PRESETS.fireballColors);
  var heroWizardFireball = document.querySelector('.setup-fireball-wrap');
  var fireballInput = document.querySelector('input[name="fireball-color"]');
  heroWizardFireball.addEventListener('click', function () {
    var newFireballColor = rotateFireballColor();
    heroWizardFireball.style.backgroundColor = newFireballColor;
    fireballInput.value = newFireballColor;
  });


  /**
   * Validating name input
   */
  var setupUserNameInput = document.querySelector('.setup-user-name');
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


  window.character = {
    PRESETS: PRESETS
  };

})();
