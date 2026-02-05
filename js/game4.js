const correctOrder = ["1","2","3","4","5","6","7","8","9","10"];
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
  } else {
    result.textContent = "Almost 😘 Try again!";
  }
});
