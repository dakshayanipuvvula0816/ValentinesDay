const correctOrder = ["1","2","3","4","5","6","7","8","9","10"];
const shuffled = [...correctOrder].sort(() => Math.random() - 0.5);

const itemsDiv = document.getElementById("items");
const slotsDiv = document.getElementById("slots");
const message = document.getElementById("message");

// Create draggable items
shuffled.forEach(num => {
  const div = document.createElement("div");
  div.className = "item";
  div.textContent = num;
  div.draggable = true;

  div.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", num);
  });

  itemsDiv.appendChild(div);
});

// Create empty slots
for (let i = 0; i < 10; i++) {
  const slot = document.createElement("div");
  slot.className = "slot";

  slot.addEventListener("dragover", e => e.preventDefault());

  slot.addEventListener("drop", e => {
    e.preventDefault();
    if (slot.textContent !== "") return;

    const data = e.dataTransfer.getData("text");
    slot.textContent = data;
    slot.classList.add("filled");

    document.querySelectorAll(".item").forEach(item => {
      if (item.textContent === data) item.remove();
    });
  });

  slotsDiv.appendChild(slot);
}

function checkOrder() {
  const placed = Array.from(document.querySelectorAll(".slot"))
    .map(slot => slot.textContent);

  if (JSON.stringify(placed) === JSON.stringify(correctOrder)) {
    message.textContent = "💖 Perfect! Our love story is in order 😍";
  } else {
    message.textContent = "💔 Oops! Try again, love 💕";
  }
}
