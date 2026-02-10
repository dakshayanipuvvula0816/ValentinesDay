const puzzles = document.querySelectorAll(".puzzle");
let solvedCount = 0;

puzzles.forEach((puzzle) => {
  const imgSrc = puzzle.dataset.img;
  const size = 3;
  let pieces = [];

  for (let i = 0; i < size * size; i++) {
    const piece = document.createElement("div");
    piece.className = "piece";
    piece.draggable = true;
    piece.dataset.index = i;

    const x = (i % size) * (260 / size);
    const y = Math.floor(i / size) * (260 / size);

    piece.style.backgroundImage = `url(${imgSrc})`;
    piece.style.backgroundPosition = `-${x}px -${y}px`;

    pieces.push(piece);
  }

  shuffle(pieces);
  pieces.forEach(p => puzzle.appendChild(p));

  let dragged = null;

  puzzle.addEventListener("dragstart", e => {
    if (!e.target.classList.contains("piece")) return;
    dragged = e.target;
    dragged.classList.add("dragging");
  });

  puzzle.addEventListener("dragend", e => {
    if (dragged) dragged.classList.remove("dragging");
  });

  puzzle.addEventListener("dragover", e => e.preventDefault());

  puzzle.addEventListener("drop", e => {
    if (!e.target.classList.contains("piece")) return;
    const target = e.target;

    const draggedIndex = [...puzzle.children].indexOf(dragged);
    const targetIndex = [...puzzle.children].indexOf(target);

    puzzle.insertBefore(dragged, puzzle.children[targetIndex]);
    puzzle.insertBefore(target, puzzle.children[draggedIndex]);

    checkPuzzle(puzzle);
  });
});

function checkPuzzle(puzzle) {
  const pieces = puzzle.querySelectorAll(".piece");
  const correct = [...pieces].every(
    (p, i) => p.dataset.index == i
  );

  if (correct && !puzzle.classList.contains("solved")) {
    puzzle.classList.add("solved");
    solvedCount++;

    if (solvedCount === 3) {
      launchFireworks();
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function launchFireworks() {
  for (let i = 0; i < 80; i++) {
    const spark = document.createElement("div");
    spark.style.position = "absolute";
    spark.style.left = "50%";
    spark.style.top = "50%";
    spark.style.width = "6px";
    spark.style.height = "6px";
    spark.style.background = `hsl(${Math.random() * 360},100%,60%)`;
    spark.style.borderRadius = "50%";
    document.getElementById("fireworks").appendChild(spark);

    const angle = Math.random() * 2 * Math.PI;
    const dist = Math.random() * 300;

    spark.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`, opacity: 0 }
    ], {
      duration: 1200,
      easing: "ease-out"
    });

    setTimeout(() => spark.remove(), 1200);
  }
}

function resetGame() {
  location.reload();
}

function goBack() {
  window.location.href = "../game1..html";
}
