'use strict';

/**
 * Utilities
 */
(function () {

  /**
   * Utility function.
   * Get a random element from array or returns null if array is empty.
   * @param  {Array} array
   * @return {*|null}
   */
  var getRandomElement = function (array) {
    if (array.length) {
      var randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    } else {
      return null;
    }
  };

  /**
   * Utility function
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


  window.utils = {
    getRandomElement: getRandomElement,
    generateRotation: generateRotation
  };

})();


