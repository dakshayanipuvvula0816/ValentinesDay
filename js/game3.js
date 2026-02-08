const ball = document.getElementById("ball");
const hitZone = document.getElementById("hitZone");
const hint = document.getElementById("hint");
const scoreEl = document.getElementById("score");
const oversEl = document.getElementById("overs");

let score = 0;
let balls = 0;
let canHit = false;

function bowlBall() {
  ball.style.animation = "none";
  ball.offsetHeight;
  ball.style.animation = "swingBall 1.5s linear forwards";

  // HIT WINDOW
  setTimeout(() => {
    canHit = true;
    hitZone.classList.add("active");
    hint.classList.add("show");

    setTimeout(() => {
      canHit = false;
      hitZone.classList.remove("active");
      hint.classList.remove("show");
    }, 300);
  }, 900);

  // Next ball
  setTimeout(nextBall, 1600);
}

function nextBall() {
  balls++;
  updateOvers();
  if (balls < 18) {
    bowlBall();
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
});

bowlBall();
