'use strict';

/**
 * Game over statistics drawing
 */
(function () {
  var MAX_HEIGHT = 140;
  var TOP_OFFSET = 100;
  var LEFT_OFFSET = 140;
  var BAR_WIDTH = 50;
  var BAR_MARGIN = 50;


  /**
   * Draw rectangle on canvas
   * @param {CanvasRenderingContext2D} context 2D rendering context
   * @param {number} x X coordinate of rectangle
   * @param {number} y Y coordinate of rectangle
   * @param {number} width width of rectangle
   * @param {number} height height of rectangle
   * @param {string} fillColor css color of rectangle
   */
  var drawRectangle = function (context, x, y, width, height, fillColor) {
    context.fillStyle = fillColor;
    context.fillRect(x, y, width, height);
  };


  /**
   * Draw stats bar
   * @param {CanvasRenderingContext2D} context the 2D rendering context
   * @param {number} barNum order number of bar (for positioning)
   * @param {number} score score
   * @param {number} maxScore maximum score
   * @param {string} playerName players name
   * @param {string} fillColor css color of rectangle
   */
  var drawBar = function (context, barNum, score, maxScore, playerName, fillColor) {
    var barHeight = Math.round(MAX_HEIGHT * (score / maxScore));

    // drawing bar itself
    context.fillStyle = fillColor;
    context.fillRect(
        LEFT_OFFSET + barNum * (BAR_MARGIN + BAR_WIDTH),
        TOP_OFFSET + (MAX_HEIGHT - barHeight),
        BAR_WIDTH,
        barHeight
    );

    // drawing player name
    context.fillStyle = '#000000';
    context.fillText(
        playerName,
        LEFT_OFFSET + barNum * (BAR_MARGIN + BAR_WIDTH),
        TOP_OFFSET + MAX_HEIGHT + 20,
        BAR_WIDTH + BAR_MARGIN
    );

    // drawing player score
    context.fillText(
        Math.round(score).toString(),
        LEFT_OFFSET + barNum * (BAR_MARGIN + BAR_WIDTH),
        TOP_OFFSET + (MAX_HEIGHT - barHeight) - 10,
        BAR_WIDTH + BAR_MARGIN
    );
  };


  /**
   * Render game statistics
   * @param {CanvasRenderingContext2D} ctx the 2D rendering context
   * @param {Array<string>} names an array of player names
   * @param {Array<number>} times an array of player scores
   */
  var renderStatistics = function (ctx, names, times) {
    // drawing rectangles
    drawRectangle(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
    drawRectangle(ctx, 100, 10, 420, 270, '#ffffff');

    // drawing text
    var message = 'Ура вы победили!\nСписок результатов:';
    ctx.fillStyle = '#000000';
    ctx.font = '16px PT Mono';
    message.split('\n').forEach(function (line, index) {
      ctx.fillText(line, 140, 40 + index * 20, 420);
    });

    var maxTime = times.reduce(function (max, current) {
      return max > current ? max : current;
    }, 0);

    // drawing all bars
    names.forEach(function (name, index) {
      var color = 'hsla(216, ' + Math.floor(Math.random() * 100) + '%, 50%, 1)';
      if (name === 'Вы') {
        color = '#ff0000';
      }
      drawBar(ctx, index, times[index], maxTime, name, color);
    });
  };


  window.renderStatistics = renderStatistics;
})();
