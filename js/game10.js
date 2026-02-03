const items = [
  "Kiss 😘", "Selfie 📸", "Sweet words 💕", "Hug 🤗",
  "Compliment 🥰", "Song 🎵", "Memory 📝", "Dance 💃",
  "Draw ❤️", "Favorite 🌹", "Emoji 💌", "Promise 💖"
];

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const angle = 360 / items.length;
let rotation = 0;

/* Place text around circle */
items.forEach((text, i) => {
  const label = document.createElement("div");
  label.className = "label";
  label.style.transform =
    `rotate(${i * angle}deg) translate(130px) rotate(${90}deg)`;
  label.textContent = text;
  wheel.appendChild(label);
});

/* Spin */
spinBtn.onclick = () => {
  const index = Math.floor(Math.random() * items.length);
  const spin = 360 * 5 + (360 - index * angle);

  rotation += spin;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.textContent = "💖 " + items[index];
  }, 4000);
};
