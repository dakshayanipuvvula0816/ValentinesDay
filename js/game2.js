(function () {
  const playArea = document.getElementById("playArea");
  const basket = document.getElementById("basket");
  const scoreEl = document.getElementById("score");
  const messageEl = document.getElementById("message");

  let score = 0;
  let basketLeft = 50; // percent; will convert to px for positioning
  const basketWidth = 120;
  const heartSize = 36;
  const fallSpeed = 2.2;
  const hearts = [];
  let messageTimeout = null;

  function getPlayAreaRect() {
    return playArea.getBoundingClientRect();
  }

  function spawnHeart() {
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
  }

  function showMessage(text) {
    if (messageTimeout) clearTimeout(messageTimeout);
    messageEl.textContent = text;
    messageEl.classList.add("show");
    messageTimeout = setTimeout(function () {
      messageEl.classList.remove("show");
    }, 1500);
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
        } else {
          showMessage("Better luck next time!");
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

  document.addEventListener("keydown", function (e) {
    const rect = getPlayAreaRect();
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
    touchStartX = e.touches[0].clientX;
    basketStartLeft = basketLeft;
  }, { passive: true });
  playArea.addEventListener("touchmove", function (e) {
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

  setInterval(spawnHeart, 1800);
  setTimeout(spawnHeart, 400);

  gameLoop();
})();
