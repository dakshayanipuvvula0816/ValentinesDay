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
  slice.textContent = text;
  wheel.appendChild(slice);
});

/* Spin logic */
spinBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * dares.length);

  const spinDegrees =
    360 * 5 + (360 - randomIndex * sliceAngle - sliceAngle / 2);

  currentRotation += spinDegrees;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    result.textContent = `💖 ${dares[randomIndex]} 💖`;
  }, 4000);
});
