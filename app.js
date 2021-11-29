let buttonColours = ["yellow", "blue", "violet", "green", "orange", "magenta"];

let gamePattern = [];
let userClickedPattern = [];
let gameOn = false;
let level = 0;

$(document).on("keypress", function () {
  if (!gameOn) {
    nextSequence();
    gameOn = true;
    $("#message").addClass("disappear");
  }
});

$(".btn").on("click", (e) => {
  let userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 6);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass(currentColour + "-on");
  setTimeout(function () {
    $("#" + currentColour).removeClass(currentColour + "-on");
  }, 300);
}

function gameOver() {
  playSound("gameover");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#message")
    .text("Ooops...Game Over! Press any key to restart ")
    .removeClass("disappear");
  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameOn = false;
}
