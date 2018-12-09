'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

// var handle = document.querySelector('.setup-user-pic');
var handle = document.querySelector('.upload');
var startCoords = {x: null, y: null};
var shift = {x: null, y: null};
var isDragged = false;

var onMouseDown = function (evt) {
  evt.preventDefault();

  startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

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

var onMouseUp = function (evt) {
  evt.preventDefault();

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);

  if (isDragged) {
    handle.addEventListener('click', onClickPreventDefault);
    isDragged = false;
  }
};

var onClickPreventDefault = function (evt) {
  evt.preventDefault();
  handle.removeEventListener('click', onClickPreventDefault);
};

handle.addEventListener('mousedown', onMouseDown);
