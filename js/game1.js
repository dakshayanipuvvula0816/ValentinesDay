const puzzles = document.querySelectorAll(".puzzle");
let solved = 0;

/* Floating hearts */
const heartBox = document.querySelector(".hearts");
for (let i = 0; i < 30; i++) {
  const h = document.createElement("span");
  h.innerText = "❤️";
  h.style.left = Math.random() * 100 + "vw";
  h.style.animationDuration = 8 + Math.random() * 10 + "s";
  heartBox.appendChild(h);
}

puzzles.forEach(puzzle => {
  const img = puzzle.dataset.img;
  const size = 4;

  const board = document.createElement("div");
  board.className = "board";

  const tray = document.createElement("div");
  tray.className = "tray";

  puzzle.append(board, tray);

  let pieces = [];

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
  pieces.forEach(p => tray.appendChild(p));

  let dragged = null;

  document.addEventListener("dragstart", e => {
    if (!e.target.classList.contains("piece")) return;
    dragged = e.target;
  });

  document.addEventListener("dragover", e => e.preventDefault());

  document.addEventListener("drop", e => {
    if (!dragged) return;

    if (e.target.classList.contains("slot")) {
      e.target.innerHTML = "";
      e.target.appendChild(dragged);
      checkPuzzle(board);
    }

    if (e.target.classList.contains("tray")) {
      e.target.appendChild(dragged);
    }
  });

  function checkPuzzle(board) {
    const slots = board.querySelectorAll(".slot");
    const correct = [...slots].every(slot =>
      slot.firstChild &&
      slot.firstChild.dataset.index === slot.dataset.index
    );

    if (correct && !board.classList.contains("done")) {
      board.classList.add("done");
      solved++;
      if (solved === 3) fireworks();
    }
  }
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function fireworks() {
  for (let i = 0; i < 100; i++) {
    const s = document.createElement("div");
    s.style.position = "fixed";
    s.style.left = "50%";
    s.style.top = "50%";
    s.style.width = "6px";
    s.style.height = "6px";
    s.style.background = `hsl(${Math.random()*360},100%,60%)`;
    s.style.borderRadius = "50%";
    document.body.appendChild(s);

    const a = Math.random() * Math.PI * 2;
    const d = Math.random() * 300;

    s.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px)`, opacity: 0 }
    ], { duration: 1200 });

    setTimeout(() => s.remove(), 1200);
  }
}

function resetGame() {
  location.reload();
}

function goBack() {
  window.location.href = "game1.html";
}
