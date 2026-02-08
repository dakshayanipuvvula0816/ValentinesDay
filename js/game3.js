const ball = document.getElementById("ball");
const result = document.getElementById("result");
const scoreEl = document.getElementById("score");
const oversEl = document.getElementById("overs");
const sparkles = document.getElementById("sparkles");

let runs = 0;
let balls = 0;
let wickets = 0;

function bowl() {
  ball.style.right = "0px";
  ball.style.transition = "none";

  setTimeout(() => {
    ball.style.transition = "right 1.2s linear";
    ball.style.right = "650px";
  }, 50);
}

function showSparkles() {
  for (let i = 0; i < 6; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = "✨";
    s.style.left = `${40 + i * 40}px`;
    sparkles.appendChild(s);
    setTimeout(() => s.remove(), 1000);
  }
}

document.body.addEventListener("click", () => {
  if (balls >= 18) return;

  const hitZone = ball.getBoundingClientRect().left < 200;

  let run = 0;
  if (hitZone) {
    run = Math.random() > 0.5 ? 6 : 4;
    runs += run;
    result.textContent = run === 6 ? "SIX 💥💖" : "FOUR 💖";

    if (run === 6) showSparkles();
  } else {
    result.textContent = "Dot Ball 😅";
  }

  balls++;
  scoreEl.textContent = `Score: ${runs}/${wickets}`;
  oversEl.textContent = `Overs: ${Math.floor(balls/6)}.${balls%6} / 3`;

  setTimeout(bowl, 700);
});

bowl();
