const correctOrder = ["Slam book.","Came in white shirt for telugu exam.","Caught by an uncle.","Baked a cake for oppa.","First airbnb.","Did lolol.","Went to kerala.","Went to trek.","Bike ride in Rain.","Came to family function."];
const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

const left = document.getElementById("left");
const right = document.getElementById("right");
const result = document.getElementById("result");

let dragged = null;

// Create items
shuffled.forEach(text => {
  const div = document.createElement("div");
  div.className = "item";
  div.textContent = text;
  div.draggable = true;
  div.dataset.value = text;
  left.appendChild(div);
});

// Create slots
correctOrder.forEach(() => {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.addEventListener("dragover", e => e.preventDefault());
  slot.addEventListener("drop", handleDrop);
  right.appendChild(slot);
});

document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("item")) {
    dragged = e.target;
  }
});

function handleDrop(e) {
  e.preventDefault();
  if (!dragged) return;

  if (this.firstChild) {
    const existing = this.firstChild;
    left.appendChild(existing);
  }
  this.appendChild(dragged);
  dragged = null;
}

// Check
document.getElementById("checkBtn").addEventListener("click", () => {
  const slots = document.querySelectorAll(".slot");
  const userOrder = Array.from(slots).map(s =>
    s.firstChild ? s.firstChild.dataset.value : ""
  );

  if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
    result.textContent = "Perfect 💖 Our love is in order!";
    showWinMessage("Every step of us is perfectly in order 💖");
  } else {
    result.textContent = "Almost 😘 Try again!";
  }
});

function showWinMessage(text) {
  const msgEl = document.getElementById("winMessage");
  if (!msgEl) return;
  msgEl.textContent = text;
  msgEl.classList.add("show");
  launchConfetti();
}

function launchConfetti() {
  const colors = ["#ff4d6d", "#ffb3c6", "#ffe5ec", "#ffd6e8", "#fff"];
  const count = 120;

  for (let i = 0; i < count; i++) {
    const conf = document.createElement("div");
    conf.style.position = "fixed";
    conf.style.width = "8px";
    conf.style.height = "14px";
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.top = "-20px";
    conf.style.opacity = "0.9";
    conf.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    conf.style.zIndex = "9999";
    document.body.appendChild(conf);

    const fallDistance = 120 + Math.random() * 40;
    const fallSide = (Math.random() - 0.5) * 80;

    conf.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${fallSide}px, ${fallDistance}vh) rotate(360deg)`,
          opacity: 0
        }
      ],
      { duration: 3200 + Math.random() * 800, easing: "ease-out" }
    );

    setTimeout(() => conf.remove(), 4200);
  }
}

// Restart button
const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => window.location.reload());
}
