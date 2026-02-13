const puzzles = document.querySelectorAll(".puzzle");
let solvedCount = 0;

/* Floating hearts (emoji stream in the background) */
const heartBox = document.querySelector(".hearts");
if (heartBox) {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement("span");
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 8 + Math.random() * 8 + "s";
    heartBox.appendChild(heart);
  }
}

/* Utility: shuffle an array in-place */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* Celebration fireworks */
function fireworks() {
  for (let burst = 0; burst < 3; burst++) {
    setTimeout(() => {
      for (let i = 0; i < 80; i++) {
        const spark = document.createElement("div");
        spark.style.position = "fixed";
        spark.style.left = Math.random() * 100 + "vw";
        spark.style.top = Math.random() * 50 + "vh";
        spark.style.width = "6px";
        spark.style.height = "6px";
        spark.style.background = `hsl(${Math.random() * 360},100%,60%)`;
        spark.style.borderRadius = "50%";
        spark.style.zIndex = "1000";
        document.body.appendChild(spark);

        const angle = Math.random() * Math.PI * 2;
        const dist = 200 + Math.random() * 200;

        spark.animate(
          [
            { transform: "translate(0,0)", opacity: 1 },
            {
              transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist}px)`,
              opacity: 0
            }
          ],
          { duration: 1200, easing: "ease-out" }
        );

        setTimeout(() => spark.remove(), 1200);
      }
    }, burst * 400);
  }
}

/* Centered win message popup */
function showWinPopup() {
  const el = document.getElementById("winMessage");
  if (!el) return;
  el.classList.add("show");
}

/* Build each puzzle board + tray */
puzzles.forEach((puzzle) => {
  const img = puzzle.dataset.img;
  const size = 4;

  const board = document.createElement("div");
  board.className = "board";

  const tray = document.createElement("div");
  tray.className = "tray";

  puzzle.append(board, tray);

  const pieces = [];

  for (let i = 0; i < size * size; i++) {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.index = i;
    board.appendChild(slot);

    const piece = document.createElement("div");
    piece.className = "piece";
    piece.draggable = true;
    piece.dataset.index = i;

    const x = (i % size) * 63;
    const y = Math.floor(i / size) * 63;

    piece.style.backgroundImage = `url(${img})`;
    piece.style.backgroundPosition = `-${x}px -${y}px`;

    pieces.push(piece);
  }

  shuffle(pieces);
  pieces.forEach((p) => tray.appendChild(p));

  let dragged = null;

  board.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("piece")) {
      dragged = e.target;
    }
  });

  tray.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("piece")) {
      dragged = e.target;
    }
  });

  document.addEventListener("dragover", (e) => e.preventDefault());

  document.addEventListener("drop", (e) => {
    if (!dragged) return;

    if (e.target.classList.contains("slot")) {
      e.target.innerHTML = "";
      e.target.appendChild(dragged);
      checkSolved();
    } else if (e.target.classList.contains("tray")) {
      e.target.appendChild(dragged);
    }
  });

  function checkSolved() {
    const slots = board.querySelectorAll(".slot");

    const solved = [...slots].every(
      (slot) =>
        slot.firstChild && slot.firstChild.dataset.index === slot.dataset.index
    );

    if (solved && !board.classList.contains("done")) {
      board.classList.add("done");
      solvedCount++;

      if (solvedCount === puzzles.length) {
        fireworks();
        showWinPopup();
      }
    }
  }
});

/* Restart button – same behavior across games */
const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });
}
