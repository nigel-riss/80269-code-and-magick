'use strict';

/**
 * Handles 'window' movement (drag-n-drop)
 */
(function (windowClass, handleClass) {
  var setup = document.querySelector(windowClass);
  var handle = document.querySelector(handleClass);
  var startCoords = {};
  var shift = {};
  var isDragged = false;


  /**
   * Mouse down event handler
   * @param {MouseEvent} evt
   */
  var onMouseDown = function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  /**
   * Mouse move event handler
   * @param {MouseEvent} evt
   */
  var onMouseMove = function (evt) {
    evt.preventDefault();

    isDragged = true;

    shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };


  /**
   * Mouse up event handler
   * @param {MouseEvent} evt
   */
  var onMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (isDragged) {
      handle.addEventListener('click', onClickPreventDefault);
      isDragged = false;
    }
  };


  /**
   * Click event handler to prevent default input behavior
   * @param {MouseEvent} evt
   */
  var onClickPreventDefault = function (evt) {
    evt.preventDefault();
    handle.removeEventListener('click', onClickPreventDefault);
  };


  handle.addEventListener('mousedown', onMouseDown);
})('.setup', '.upload');
