const correctOrder = ["1","2","3","4","5","6","7","8","9","10"];
const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

const left = document.getElementById("left");
const right = document.getElementById("right");
const result = document.getElementById("result");

// Create draggable items
shuffled.forEach(text => {
  const div = document.createElement("div");
  div.className = "item";
  div.textContent = text;
  div.draggable = true;
  div.dataset.value = text;
  left.appendChild(div);
});

// Create empty slots
correctOrder.forEach(() => {
  const slot = document.createElement("div");
  slot.className = "slot";
  slot.dataset.value = "";
  right.appendChild(slot);
});

// Drag & Drop
let draggedItem = null;

document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("item")) {
    draggedItem = e.target;
  }
});

document.addEventListener("dragover", e => {
  if (e.target.classList.contains("slot")) {
    e.preventDefault();
  }
});

document.addEventListener("drop", e => {
  if (e.target.classList.contains("slot") && draggedItem) {
    if (!e.target.textContent) {
      e.target.textContent = draggedItem.textContent;
      e.target.dataset.value = draggedItem.dataset.value;
      draggedItem.remove();
      draggedItem = null;
    }
  }
});

// Check order
document.getElementById("checkBtn").addEventListener("click", () => {
  const slots = document.querySelectorAll(".slot");
  const userOrder = Array.from(slots).map(s => s.dataset.value);

  if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
    result.textContent = "Perfect 💖 Our love is in order!";
  } else {
    result.textContent = "Oops 😅 Try again, my love!";
  }
});
