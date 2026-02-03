const actions = [
  "Kiss 😘",
  "Selfie 📸",
  "Sweet words 💕",
  "Hug 🤗",
  "Compliment 🥰",
  "Sing 🎵",
  "Memory 📝",
  "Dance 💃",
  "Draw ❤️",
  "Favorite 🌹",
  "Emoji 💌",
  "Promise 💖"
];

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const angle = 360 / actions.length;
let rotation = 0;

/* Create text inside each slice */
actions.forEach((text, i) => {
  const el = document.createElement("div");
  el.className = "slice-text";
  el.textContent = text;

  el.style.transform =
    `rotate(${i * angle + angle / 2}deg) translate(110px) rotate(90deg)`;

  wheel.appendChild(el);
});

/* Spin */
spinBtn.addEventListener("click", () => {
  const index = Math.floor(Math.random() * actions.length);
  const spin = 360 * 5 + (360 - index * angle - angle / 2);

  rotation += spin;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.textContent = "💖 " + actions[index];
  }, 4000);
});
