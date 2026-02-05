const sentences = [
  "We met for the first time 💫",
  "We started talking every day 📱",
  "Our first laugh together 😂",
  "Late night conversations 🌙",
  "That moment I realized I love you 💖",
  "Our first fight 😅",
  "We made up stronger 💞",
  "Creating memories together ✨",
  "Dreaming about the future 💍",
  "Forever started with us 💘"
];

// Correct order = as written above
const correctOrder = [...sentences];

// Shuffle for jumbled side
const shuffled = [...sentences].sort(() => Math.random() - 0.5);

const jumbledBox = document.getElementById("jumbled");
const slotsBox = document.getElementById("slots");
const message = document.getElementById("message");

// Create draggable items
shuffled.forEach(text => {
  const item = document.createElement("div");
  item.className = "item";
  item.textContent = text;
  item.draggable = true;
  item.dataset.value = text;
  jumbledBox.appendChild(item);
});

// Create empty slots
sentences.forEach(() => {
  const slot = document.createElement("div");
  slot.className = "slot";
  slotsBox.appendChild(slot);
});

let draggedItem = null;

// Drag start
document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("item")) {
    draggedItem = e.target;
  }
});

// Allow drop
document.addEventListener("dragover", e => {
  if (e.target.classList.contains("slot") || e.target.classList.contains("box")) {
    e.preventDefault();
  }
});

// Drop logic (flexible movement)
document.addEventListener("drop", e => {
  if (!draggedItem) return;

  if (e.target.classList.contains("slot")) {
    if (e.target.children.length === 0) {
      e.target.appendChild(draggedItem);
    }
  } else if (e.target.classList.contains("box")) {
    e.target.appendChild(draggedItem);
  }

  draggedItem = null;
});

// Check answer
document.getElementById("checkBtn").addEventListener("click", () => {
  const placed = [...slotsBox.children].map(
    slot => slot.firstChild?.dataset.value || null
  );

  if (placed.includes(null)) {
    message.textContent = "Place all the moments first 💕";
    return;
  }

  const isCorrect = placed.every((text, i) => text === correctOrder[i]);

  message.textContent = isCorrect
    ? "Perfect 💖 Our love story is in the right order!"
    : "Almost 😅 Try again, love!";
});
