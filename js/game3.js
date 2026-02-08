const ball = document.getElementById("ball");
const tap = document.querySelector(".tap");
const scoreEl = document.getElementById("score");
const oversEl = document.getElementById("overs");

let runs = 0;
let balls = 0;
let isHittable = false;
let animationId;

const startX = window.innerWidth - 60;
const endX = 290;
const baseY = 170;

function bowlBall() {
  let progress = 0;
  isHittable = false;
  tap.style.display = "none";

  function animate() {
    progress += 0.012;

    if (progress >= 1) {
      cancelAnimationFrame(animationId);
      registerBall(0);
      return;
    }

    const x = startX - (startX - endX) * progress;
    const swing = Math.sin(progress * Math.PI) * 60;
    const y = baseY + swing;

    ball.style.left = x + "px";
    ball.style.bottom = y + "px";

    if (progress > 0.55 && progress < 0.7) {
      isHittable = true;
      tap.style.display = "block";
    } else {
      isHittable = false;
      tap.style.display = "none";
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();
}

function registerBall(run) {
  balls++;
  if (run) showRun(run);
  runs += run;
  updateScore();

  if (balls < 18) {
    setTimeout(bowlBall, 800);
  }
}

function showRun(run) {
  const el = document.createElement("div");
  el.innerText = run;
  el.style.position = "absolute";
  el.style.left = "270px";
  el.style.bottom = "300px";
  el.style.fontSize = "64px";
  el.style.color = run === 6 ? "gold" : "white";
  el.style.textShadow = "0 0 30px gold";
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 900);
}

function updateScore() {
  const over = Math.floor(balls / 6);
  const ball = balls % 6;
  scoreEl.textContent = `Score: ${runs}/0`;
  oversEl.textContent = `Overs: ${over}.${ball} / 3`;
}

document.addEventListener("click", () => {
  if (!isHittable) return;
  cancelAnimationFrame(animationId);
  const run = Math.random() > 0.5 ? 6 : 4;
  registerBall(run);
});

bowlBall();
