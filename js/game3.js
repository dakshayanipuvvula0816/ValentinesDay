const ball = document.getElementById("ball");
const tapText = document.querySelector(".tap-now");
const scoreEl = document.getElementById("score");
const oversEl = document.getElementById("overs");

let runs = 0;
let wickets = 0;
let balls = 0;
let isHittable = false;
let moveInterval;

function bowlBall() {
  let pos = -40;
  isHittable = false;
  tapText.style.display = "none";

  ball.style.right = pos + "px";

  moveInterval = setInterval(() => {
    pos += 6;
    ball.style.right = pos + "px";

    // HIT WINDOW
    if (pos > 250 && pos < 320) {
      isHittable = true;
      tapText.style.display = "block";
    } else {
      isHittable = false;
      tapText.style.display = "none";
    }

    // Reach bat
    if (pos >= 360) {
      clearInterval(moveInterval);
      registerBall(0);
    }
  }, 16);
}

function registerBall(run) {
  balls++;

  if (run > 0) {
    runs += run;
    showRun(run);
  }

  updateScore();

  if (balls < 18) {
    setTimeout(bowlBall, 900);
  }
}

function showRun(run) {
  const el = document.createElement("div");
  el.innerText = run;
  el.style.position = "absolute";
  el.style.left = "300px";
  el.style.bottom = "270px";
  el.style.fontSize = "60px";
  el.style.color = run === 6 ? "gold" : "white";
  el.style.textShadow = "0 0 25px gold";
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 800);
}

function updateScore() {
  const over = Math.floor(balls / 6);
  const ballNo = balls % 6;
  scoreEl.innerText = `Score: ${runs}/${wickets}`;
  oversEl.innerText = `Overs: ${over}.${ballNo} / 3`;
}

document.body.addEventListener("click", () => {
  if (isHittable) {
    clearInterval(moveInterval);
    const run = Math.random() > 0.5 ? 6 : 4;
    registerBall(run);
  }
});

bowlBall();
