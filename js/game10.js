const dares = [
  "Give me a kiss 😘",
  "Send me a cute selfie 📸",
  "Say something sweet 💕",
  "Hug me 🤗",
  "Compliment me 🥰",
  "Sing a song 🎵",
  "Share a memory 📝",
  "Dance 💃",
  "Draw a heart ❤️",
  "Favorite thing 🌹",
  "Love emoji 💌",
  "Make a promise 💖"
];

const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");

const sliceAngle = 360 / dares.length;
let currentRotation = 0;

/* Create slices */
dares.forEach((text, i) => {
  const slice = document.createElement("div");
  slice.className = "slice";
  slice.style.transform = `rotate(${i * sliceAngle}deg)`;

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = text;

  slice.appendChild(label);
  wheel.appendChild(slice);
});

/* Spin */
spinBtn.addEventListener("click", () => {
  const index = Math.floor(Math.random() * dares.length);
  const spin =
    360 * 5 + (360 - index * sliceAngle - sliceAngle / 2);

  currentRotation += spin;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    result.textContent = dares[index];
  }, 4000);
});
