// ✅ THIS ARRAY DEFINES THE CORRECT ORDER
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

// Copy = correct order reference
const correctOrder = [...sentences];

// Shuffle for left side
const shuffled = [...sentences].sort(() => Math.random() - 0.5);

const jumbled = document.getElementById("jumbled");
const slots = document.getElementById("slots");
const message = document.getElementById("message");

let draggedItem = null;

// Create draggable items
shuffled.forEach(text => {
  const div = document.createElement("div");
  div.className = "item";
  div.textContent = text;
  div.draggable = true;
  div.dataset.value = text;
  jumbled.appendChild(div);
});

// Create empty slots
sentences.forEach(() => {
  const slot = document.createElement("div");
  slot.className = "slot";
  slots.appendChild(slot);
});

// Drag logic
document.addEventListener("dragstart", e => {
  if (e.target.classList.contains("item")) {
    draggedItem = e.target;
  }
});

document.addEventListener("dragover", e => {
  if (e.target.classList.contains("slot") || e.target.classList.contains("box")) {
    e.preventDefault();
  }
});

document.addEventListener("drop", e => {
  if (!draggedItem) return;

  if (e.target.classList.contains("slot") && e.target.children.length === 0) {
    e.target.appendChild(draggedItem);
  } else if (e.target.classList.contains("box")) {
    e.target.appendChild(draggedItem);
  }

  draggedItem = null;
});

// ✅ CHECK ORDER
document.getElementById("checkBtn").addEventListener("click", () => {
  const placedOrder = [...slots.children].map(
    slot => slot.firstChild?.dataset.value || null
  );

  if (placedOrder.includes(null)) {
    message.textContent = "Place all moments first 💕";
    return;
  }

  const correct = placedOrder.every(
    (text, index) => text === correctOrder[index]
  );

  message.textContent = correct
    ? "Perfect 💖 Our love story is in the right order!"
    : "Not quite 😅 Try again, love!";
});
