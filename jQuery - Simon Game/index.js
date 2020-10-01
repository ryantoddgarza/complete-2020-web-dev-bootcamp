const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userPattern = [];
let beginGame = false;
let level = 0;

function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function animatePress(color) {
  const clickedButton = $(`#${color}`);

  clickedButton.addClass('pressed');
  setTimeout(function () {
    clickedButton.removeClass('pressed');
  }, 100);
}

function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  const button = $(`#${randomChosenColor}`);

  userPattern = [];
  gamePattern.push(randomChosenColor);

  level++;
  $('#levelTitle').text(`Level ${level}`);

  playSound(randomChosenColor);
  button.fadeOut(100).fadeIn(100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  beginGame = false;
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('#levelTitle').text('Game Over, Press Any Key to Restart');
    $('body').addClass('game-over');
    startOver();

    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
  }
}

$(document).keydown(function () {
  if (beginGame === false) {
    nextSequence();
    beginGame = true;
  }
});

$('.btn').click(function (e) {
  const userChosenColor = $(this).attr('id');

  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userPattern.length - 1);
});
