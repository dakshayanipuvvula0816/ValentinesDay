const actions = [
  "Kiss 😘",
  "Selfie 📸",
  "Sweet words 💕",
  "Hug 🤗",
  "Compliment 🥰",
  "Sing a song 🎵",
  "Memory 📝",
  "Dance 💃",
  "Draw ❤️",
  "Favorite thing 🌹",
  "Emoji 💌",
  "Promise 💖"
];

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const angle = 360 / actions.length;
let rotation = 0;

/* Place labels */
actions.forEach((text, i) => {
  const label = document.createElement("div");
  label.className = "label";
  label.textContent = text;

  label.style.transform =
    `rotate(${i * angle}deg) translate(120px) rotate(90deg)`;

  wheel.appendChild(label);
});

/* Spin logic */
spinBtn.addEventListener("click", () => {
  const index = Math.floor(Math.random() * actions.length);
  const spin = 360 * 5 + (360 - index * angle);

  rotation += spin;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.textContent = "💖 " + actions[index];
  }, 4000);
});
