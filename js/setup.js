'use strict';

/**
 * Handle setup window open and close
 */
(function () {

  var KEY_ENTER = 13;
  var KEY_ESCAPE = 27;


  /**
   * Showing setup window
   */
  var showSetup = function () {
    var setupBlock = document.querySelector('.setup');
    setupBlock.style.top = '80px';
    setupBlock.style.left = '50%';
    setupBlock.style.transform = 'translateX(-50%)';
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

})();
