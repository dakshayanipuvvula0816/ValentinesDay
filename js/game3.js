const ball = document.getElementById("ball");
const hitZone = document.getElementById("hitZone");
const hint = document.getElementById("hint");
const scoreEl = document.getElementById("score");
const oversEl = document.getElementById("overs");

let score = 0;
let balls = 0;
let canHit = false;

let posX = 0;
let posY = 0;
let swingDir = 1;

function bowlBall() {
  posX = 0;
  posY = 0;
  swingDir = Math.random() > 0.5 ? 1 : -1;

  ball.style.right = "40px";
  ball.style.top = "50%";

  canHit = false;
  hitZone.classList.remove("active");
  hint.classList.remove("show");

  let frames = 0;
  const interval = setInterval(() => {
    frames++;

    posX += 6;
    posY += swingDir * Math.sin(frames / 10) * 2;

    ball.style.transform =
      `translate(${-posX}px, calc(-50% + ${posY}px))`;

    // HIT WINDOW
    if (frames === 60) {
      canHit = true;
      hitZone.classList.add("active");
      hint.classList.add("show");
    }

    if (frames === 75) {
      canHit = false;
      hitZone.classList.remove("active");
      hint.classList.remove("show");
    }

    if (frames > 95) {
      clearInterval(interval);
      nextBall();
    }
  }, 16);
}

function nextBall() {
  balls++;
  updateOvers();

  if (balls < 18) {
    setTimeout(bowlBall, 500);
  }
}

function updateOvers() {
  const o = Math.floor(balls / 6);
  const b = balls % 6;
  oversEl.textContent = `${o}.${b}`;
}

document.body.addEventListener("click", () => {
  if (!canHit) return;

  const runs = Math.random() > 0.5 ? 6 : 4;
  score += runs;
  scoreEl.textContent = score;

  canHit = false;
  hitZone.classList.remove("active");
  hint.classList.remove("show");
});

bowlBall();
