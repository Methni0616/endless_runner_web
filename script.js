const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
let gameOverDiv = document.getElementById("game-over");

let isJumping = false;
let runFrame = 0;
let runInterval;
let score = 0;
let gameOver = false;
let obstacleInterval;

// -----------------------
// RUNNING ANIMATION
// -----------------------
function startRunning() {
  runInterval = setInterval(() => {
    if (gameOver) return;
    runFrame = (runFrame % 2) + 1; // walk1 -> walk2
    player.style.backgroundImage = `url("assets/bunny1_walk${runFrame}.png")`;
  }, 200);
}

// -----------------------
// JUMP ANIMATION
// -----------------------
function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;
  clearInterval(runInterval);
  player.style.backgroundImage = 'url("assets/bunny1_jump.png")';

  let pos = 0;
  let up = setInterval(() => {
    if (pos >= 160) {
      clearInterval(up);
      let down = setInterval(() => {
        if (pos <= 0) {
          clearInterval(down);
          isJumping = false;
          startRunning();
        }
        pos -= 6;
        player.style.bottom = pos + "px";
      }, 20);
    }
    pos += 6;
    player.style.bottom = pos + "px";
  }, 20);
}

// -----------------------
// CREATE OBSTACLES
// -----------------------
function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  if (Math.random() > 0.5) obstacle.classList.add("box");
  else obstacle.classList.add("spike");

  obstacle.style.right = "-60px";
  game.appendChild(obstacle);

  let moveInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(moveInterval);
      obstacle.remove();
      return;
    }

    obstacle.style.right = (parseInt(obstacle.style.right) + 6) + "px";

    const obsRect = obstacle.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // COLLISION DETECTION
    if (
      obsRect.left < playerRect.right &&
      obsRect.right > playerRect.left &&
      obsRect.top < playerRect.bottom &&
      obsRect.bottom > playerRect.top
    ) {
      endGame();
    }

    if (obsRect.right > window.innerWidth) {
      clearInterval(moveInterval);
      obstacle.remove();
    }
  }, 20);
}

// -----------------------
// SPAWN OBSTACLES
// -----------------------
function startObstacles() {
  obstacleInterval = setInterval(createObstacle, 1800);
}

// -----------------------
// SCORE COUNTER
// -----------------------
function startScore() {
  setInterval(() => {
    if (!gameOver) {       // only increment score while playing
      score++;
      scoreText.innerText = "Score: " + score;  // update div
    }
  }, 1000);  // increments every 1 second
}

// -----------------------
// GAME OVER
// -----------------------
function endGame() {
  gameOver = true;
  clearInterval(runInterval);
  clearInterval(obstacleInterval);
  player.style.backgroundImage = 'url("assets/bunny1_hurt.png")';

  gameOverDiv.innerHTML = `Game Over!<br>Score: ${score}<br>Tap to Restart`;
  gameOverDiv.style.display = "block";

  // REMOVE old listener and add new
  const newDiv = gameOverDiv.cloneNode(true);
  gameOverDiv.replaceWith(newDiv);
  gameOverDiv = document.getElementById("game-over");
  gameOverDiv.addEventListener("click", restartGame);
}

// -----------------------
// RESTART GAME
// -----------------------
function restartGame() {
  // Reset variables
  score = 0;
  gameOver = false;
  runFrame = 0;
  isJumping = false;

  // Remove all existing obstacles
  document.querySelectorAll(".obstacle").forEach(obs => obs.remove());

  // Reset player
  player.style.bottom = "0px";
  player.style.backgroundImage = 'url("assets/bunny1_stand.png")';

  // Hide Game Over overlay
  gameOverDiv.style.display = "none";
  gameOverDiv.innerHTML = "";

  // Restart game loops
  startRunning();
  startObstacles();
}

// -----------------------
// INIT GAME
// -----------------------
startRunning();
startObstacles();
startScore();

// Controls
document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

// SERVICE WORKER (PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(reg => console.log("Service Worker registered", reg))
      .catch(err => console.log("SW registration failed", err));
  });
}
