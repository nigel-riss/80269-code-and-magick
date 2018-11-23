'use strict';

window.renderStatistics = function (ctx, names, times) {
  // drawing rectangles
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, 420, 270);

  // drawing text
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили', 130, 30, 420);

  // var drawBar = function(bar)
};
