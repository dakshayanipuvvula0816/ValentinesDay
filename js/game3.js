(function () {
  const ball = document.getElementById("ball");
  const batsmanWrap = document.getElementById("batsmanWrap");
  const sweetSpot = document.getElementById("sweetSpot");
  const scorePopup = document.getElementById("scorePopup");
  const scoreEl = document.getElementById("score");
  const oversEl = document.getElementById("overs");
  const statRuns = document.getElementById("statRuns");
  const statFours = document.getElementById("statFours");
  const statSixes = document.getElementById("statSixes");
  const statBalls = document.getElementById("statBalls");
  const statSR = document.getElementById("statSR");

  let runs = 0;
  let fours = 0;
  let sixes = 0;
  let balls = 0;
  let isHittable = false;
  let animationId = null;

  // Ball path: from right side of ground, swing towards batsman (left)
  const ground = document.querySelector(".ground");
  const getStartX = () => (ground ? ground.offsetWidth - 50 : window.innerWidth - 70);
  const endX = 180;
  const baseY = 120;
  const swingAmount = 70;

  function bowlBall() {
    isHittable = false;
    batsmanWrap.classList.remove("hittable");

    let progress = 0;
    const startX = getStartX();

    function animate() {
      progress += 0.014;

      if (progress >= 1) {
        cancelAnimationFrame(animationId);
        animationId = null;
        registerBall(0);
        return;
      }

      // Linear X: right to left (towards batsman)
      const x = startX - (startX - endX) * progress;
      // Swing: sine so ball curves in then towards batsman
      const swing = Math.sin(progress * Math.PI) * swingAmount;
      const y = baseY + swing;

      ball.style.left = x + "px";
      ball.style.top = y + "px";
      ball.style.bottom = "auto";

      // Sweet spot is "on" when ball is in the hitting window (e.g. 50%–75% of journey)
      if (progress > 0.48 && progress < 0.72) {
        isHittable = true;
        batsmanWrap.classList.add("hittable");
      } else {
        isHittable = false;
        batsmanWrap.classList.remove("hittable");
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();
  }

  function registerBall(run) {
    balls++;
    if (run === 4) fours++;
    if (run === 6) sixes++;
    runs += run;

    if (run > 0) {
      showScorePopup(run);
    }

    updateScoreboard();
    updateStatsTable();

    if (balls < 18) {
      setTimeout(bowlBall, 900);
    }
  }

  function showScorePopup(run) {
    scorePopup.textContent = run;
    scorePopup.classList.remove("four", "six", "show");
    scorePopup.classList.add(run === 6 ? "six" : "four", "show");

    setTimeout(function () {
      scorePopup.classList.remove("show");
    }, 800);
  }

  function updateScoreboard() {
    scoreEl.textContent = "Score: " + runs + "/0";
    const over = Math.floor(balls / 6);
    const ballInOver = balls % 6;
    oversEl.textContent = "Overs: " + over + "." + ballInOver + " / 3";
  }

  function updateStatsTable() {
    statRuns.textContent = runs;
    statFours.textContent = fours;
    statSixes.textContent = sixes;
    statBalls.textContent = balls;
    const sr = balls > 0 ? ((runs / balls) * 100).toFixed(2) : "0.00";
    statSR.textContent = sr;
  }

  // Hit: click on batsman (or the wrap) when the spot is highlighted
  batsmanWrap.addEventListener("click", function () {
    if (!isHittable) return;
    cancelAnimationFrame(animationId);
    animationId = null;
    isHittable = false;
    batsmanWrap.classList.remove("hittable");

    const run = Math.random() > 0.5 ? 6 : 4;
    registerBall(run);
  });

  bowlBall();
})();
