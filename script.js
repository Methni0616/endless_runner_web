const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");

let isJumping = false;
let runFrame = 0;
let runInterval;
let score = 0;
let gameOver = false;

/* Start running animation */
function startRunning() {
  runInterval = setInterval(() => {
    if (gameOver) return;
    runFrame = (runFrame % 2) + 1; // walk1 → walk2 → walk1 ...
    player.style.backgroundImage = `url("assets/bunny1_walk${runFrame}.png")`;
  }, 200); // change every 0.2s
}

/* Jump animation */
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

/* Create obstacles */
function createObstacle() {
  if (gameOver) return;

  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");

  if (Math.random() > 0.5) obstacle.classList.add("box");
  else obstacle.classList.add("spike");

  game.appendChild(obstacle);

  let moveInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(moveInterval);
      obstacle.remove();
    }

    obstacle.style.right = (parseInt(obstacle.style.right || -60) + 6) + "px";

    let obsRect = obstacle.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect();

    // Collision detection
    if (
      obsRect.left < playerRect.right &&
      obsRect.right > playerRect.left &&
      obsRect.top < playerRect.bottom &&
      obsRect.bottom > playerRect.top
    ) {
      endGame();
    }

    if (obsRect.right < 0) {
      clearInterval(moveInterval);
      obstacle.remove();
    }
  }, 20);
}

/* Spawn obstacles */
setInterval(createObstacle, 1800);

/* Score counter */
setInterval(() => {
  if (!gameOver) {
    score++;
    scoreText.innerText = "Score: " + score;
  }
}, 1000);

/* Game over */
function endGame() {
  gameOver = true;
  clearInterval(runInterval);
  player.style.backgroundImage = 'url("assets/bunny1_hurt.png")';
  alert("Game Over!\nScore: " + score);
  location.reload();
}

/* Start game */
startRunning();
document.addEventListener("click", jump);
document.addEventListener("touchstart", jump);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then(reg => console.log("Service Worker registered", reg))
      .catch(err => console.log("SW registration failed", err));
  });
}
