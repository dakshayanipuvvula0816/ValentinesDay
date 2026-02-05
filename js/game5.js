const gridSize = 12;

/* 👉 YOU WILL EDIT THESE LATER */
const words = [
  "LOVE", "HEART", "FOREVER", "HUG", "KISS",
  "SMILE", "US", "DATE", "PROMISE", "SOUL"
];

const grid = document.getElementById("grid");
const wordList = document.getElementById("wordList");

let isDragging = false;
let selectedCells = [];

/* Create empty grid */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let gridLetters = Array(gridSize * gridSize).fill("")
  .map(() => letters[Math.floor(Math.random() * letters.length)]);

/* Place words horizontally for now */
words.forEach(word => {
  let row = Math.floor(Math.random() * gridSize);
  let col = Math.floor(Math.random() * (gridSize - word.length));
  for (let i = 0; i < word.length; i++) {
    gridLetters[row * gridSize + col + i] = word[i];
  }
});

/* Render grid */
gridLetters.forEach((letter, index) => {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = letter;
  cell.dataset.index = index;
  grid.appendChild(cell);
});

/* Render word list */
words.forEach(w => {
  const li = document.createElement("li");
  li.textContent = w;
  li.id = "word-" + w;
  wordList.appendChild(li);
});

/* Drag logic */
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("mousedown", startSelect);
  cell.addEventListener("mouseenter", dragSelect);
});

document.addEventListener("mouseup", endSelect);

function startSelect(e) {
  clearSelection();
  isDragging = true;
  selectCell(e.target);
}

function dragSelect(e) {
  if (!isDragging) return;
  selectCell(e.target);
}

function endSelect() {
  isDragging = false;
  checkWord();
}

function selectCell(cell) {
  if (!selectedCells.includes(cell)) {
    cell.classList.add("selected");
    selectedCells.push(cell);
  }
}

function clearSelection() {
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
}

function checkWord() {
  const word = selectedCells.map(c => c.textContent).join("");
  if (words.includes(word)) {
    selectedCells.forEach(c => {
      c.classList.remove("selected");
      c.classList.add("found");
    });
    document.getElementById("word-" + word).classList.add("found");
  } else {
    clearSelection();
  }
}
