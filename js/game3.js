(function () {
  const ball = document.getElementById("ball");
  const batsmanWrap = document.getElementById("batsmanWrap");
  const bat = document.getElementById("bat");
  const sweetSpot = document.getElementById("sweetSpot");
  const scorePopup = document.getElementById("scorePopup");
  const scoreEl = document.getElementById("score");
  const oversEl = document.getElementById("overs");
  const statRuns = document.getElementById("statRuns");
  const statFours = document.getElementById("statFours");
  const statSixes = document.getElementById("statSixes");
  const statBalls = document.getElementById("statBalls");
  const statSR = document.getElementById("statSR");
  const crackersContainer = document.getElementById("crackersContainer");

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
      progress += 0.005;

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

      // Sweet spot is "on" when ball is in the hitting window (wider for easier timing)
      if (progress > 0.42 && progress < 0.78) {
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
      if (run === 4 || run === 6) triggerCrackers();
    }

    updateScoreboard();
    updateStatsTable();

    if (balls < 18) {
      setTimeout(bowlBall, 900);
    } else {
      // Overs complete: confetti for a while, then show "HIT MAN"
      triggerGameEndConfetti();
      setTimeout(function () {
        const winEl = document.getElementById("winMessage");
        if (winEl) {
          winEl.textContent = "HIT MAN";
          winEl.classList.add("show");
        }
      }, 2500);
    }
  }

  function triggerGameEndConfetti() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.35;
    const colors = ["#ff69b4", "#ff1493", "#ffd700", "#fff", "#c41e3a"];
    const count = 48;
    for (let i = 0; i < count; i++) {
      setTimeout(function () {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const dist = 80 + Math.random() * 120;
        const dx = Math.cos(angle) * dist + (Math.random() - 0.5) * 40;
        const dy = Math.sin(angle) * dist + (Math.random() - 0.5) * 40;
        const el = document.createElement("div");
        el.className = "cracker-particle" + (Math.random() > 0.5 ? " square" : "");
        el.style.left = (centerX - 5) + "px";
        el.style.top = (centerY - 5) + "px";
        el.style.setProperty("--cracker-dx", dx + "px");
        el.style.setProperty("--cracker-dy", dy + "px");
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        crackersContainer.appendChild(el);
        setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 2200);
      }, i * 60);
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

  function triggerCrackers() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.35;
    const colors = ["#ff69b4", "#ff1493", "#ffd700", "#fff", "#c41e3a"];
    const count = 32;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const dist = 80 + Math.random() * 120;
      const dx = Math.cos(angle) * dist + (Math.random() - 0.5) * 40;
      const dy = Math.sin(angle) * dist + (Math.random() - 0.5) * 40;

      const el = document.createElement("div");
      el.className = "cracker-particle" + (Math.random() > 0.5 ? " square" : "");
      el.style.left = (centerX - 5) + "px";
      el.style.top = (centerY - 5) + "px";
      el.style.setProperty("--cracker-dx", dx + "px");
      el.style.setProperty("--cracker-dy", dy + "px");
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      crackersContainer.appendChild(el);

      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 1700);
    }
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

    // Swing the bat visually
    if (bat) {
      bat.classList.add("swing");
      setTimeout(() => bat.classList.remove("swing"), 250);
    }

    const run = Math.random() > 0.5 ? 6 : 4;
    registerBall(run);
  });

  bowlBall();

  // Restart button (reloads the over)
  const restartBtn = document.getElementById("restartBtn");
  if (restartBtn) {
    restartBtn.addEventListener("click", function () {
      window.location.reload();
    });
  }
})();
