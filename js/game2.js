(function () {
  const playArea = document.getElementById("playArea");
  const basket = document.getElementById("basket");
  const scoreEl = document.getElementById("score");
  const messageEl = document.getElementById("message");
  const restartBtn = document.getElementById("restartBtn");

  const TOTAL_HEARTS = 10;
  let score = 0;
  let heartsSpawned = 0;
  let gameOver = false;
  let basketLeft = 50;
  const basketWidth = 150;
  const heartSize = 36;
  const fallSpeed = 1.0;
  const hearts = [];
  let spawnIntervalId = null;

  function getPlayAreaRect() {
    return playArea.getBoundingClientRect();
  }

  function spawnHeart() {
    if (gameOver || heartsSpawned >= TOTAL_HEARTS) return;
    heartsSpawned++;

    const rect = getPlayAreaRect();
    const maxLeft = Math.max(0, rect.width - heartSize);
    const left = Math.random() * maxLeft;

    const el = document.createElement("div");
    el.className = "falling-heart";
    el.style.left = left + "px";
    el.style.top = "-50px";
    playArea.appendChild(el);

    hearts.push({
      el,
      top: -50,
      left,
      width: heartSize,
      height: heartSize
    });

    if (heartsSpawned >= TOTAL_HEARTS && spawnIntervalId) {
      clearInterval(spawnIntervalId);
      spawnIntervalId = null;
    }
  }

  function showMessage(text, isGameOver, isWin) {
    messageEl.textContent = text;
    messageEl.classList.remove("game-over", "win");
    if (isGameOver) messageEl.classList.add("game-over");
    if (isWin) messageEl.classList.add("win");
    messageEl.classList.add("show");
    if (!isGameOver) {
      setTimeout(function () {
        messageEl.classList.remove("show");
      }, 1500);
    }
  }

  function endGame(isWin) {
    gameOver = true;
    if (spawnIntervalId) {
      clearInterval(spawnIntervalId);
      spawnIntervalId = null;
    }
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      if (h.el.parentNode) h.el.parentNode.removeChild(h.el);
    }
    hearts.length = 0;
  }

  function getBasketRect() {
    const r = basket.getBoundingClientRect();
    const area = playArea.getBoundingClientRect();
    return {
      left: r.left - area.left,
      right: r.right - area.left,
      top: r.top - area.top,
      width: r.width
    };
  }

  function gameLoop() {
    if (gameOver) return;

    const rect = getPlayAreaRect();
    const basketRect = getBasketRect();
    const catchZoneTop = rect.height - 80;

    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      h.top += fallSpeed;
      h.el.style.top = h.top + "px";

      if (h.top >= catchZoneTop) {
        const heartCenterX = h.left + h.width / 2;
        const caught = heartCenterX >= basketRect.left && heartCenterX <= basketRect.right;

        if (caught) {
          score++;
          scoreEl.textContent = score;
          if (score === TOTAL_HEARTS) {
            endGame(true);
            showMessage("Thanks for keeping my heart safe.", true, true);
            return;
          }
        } else {
          endGame(false);
          showMessage("Better luck next time!", true, false);
          return;
        }

        if (h.el.parentNode) h.el.parentNode.removeChild(h.el);
        hearts.splice(i, 1);
      }
    }

    requestAnimationFrame(gameLoop);
  }

  function setBasketPosition(percent) {
    const rect = getPlayAreaRect();
    const maxLeft = Math.max(1, rect.width - basketWidth);
    const leftPx = Math.max(0, Math.min(maxLeft, (percent / 100) * maxLeft));
    basket.style.left = leftPx + "px";
    basket.style.transform = "none";
    basketLeft = (leftPx / maxLeft) * 100;
  }

  function initBasket() {
    basket.style.left = "50%";
    basket.style.transform = "translateX(-50%)";
    basketLeft = 50;
  }

  function restartGame() {
    gameOver = false;
    score = 0;
    heartsSpawned = 0;
    scoreEl.textContent = "0";
    messageEl.classList.remove("show", "game-over", "win");
    messageEl.textContent = "";
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      if (h.el.parentNode) h.el.parentNode.removeChild(h.el);
    }
    hearts.length = 0;
    if (spawnIntervalId) {
      clearInterval(spawnIntervalId);
      spawnIntervalId = null;
    }
    initBasket();
    spawnIntervalId = setInterval(spawnHeart, 1800);
    setTimeout(spawnHeart, 400);
    gameLoop();
  }

  document.addEventListener("keydown", function (e) {
    if (gameOver) return;
    const step = 4;
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
      e.preventDefault();
      basketLeft = Math.max(0, basketLeft - step);
      setBasketPosition(basketLeft);
    } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
      e.preventDefault();
      basketLeft = Math.min(100, basketLeft + step);
      setBasketPosition(basketLeft);
    }
  });

  let touchStartX = 0;
  let basketStartLeft = 0;
  playArea.addEventListener("touchstart", function (e) {
    if (gameOver) return;
    touchStartX = e.touches[0].clientX;
    basketStartLeft = basketLeft;
  }, { passive: true });
  playArea.addEventListener("touchmove", function (e) {
    if (gameOver) return;
    const dx = e.touches[0].clientX - touchStartX;
    const rect = getPlayAreaRect();
    const sensitivity = 100 / rect.width;
    basketLeft = Math.max(0, Math.min(100, basketStartLeft + dx * sensitivity));
    setBasketPosition(basketLeft);
  }, { passive: true });

  initBasket();
  window.addEventListener("resize", function () {
    setBasketPosition(basketLeft);
  });

  restartBtn.addEventListener("click", restartGame);

  spawnIntervalId = setInterval(spawnHeart, 1800);
  setTimeout(spawnHeart, 400);

  gameLoop();
})();
