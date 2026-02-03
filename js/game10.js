const dares = [
  "Give me a kiss 😘",
  "Send me a cute selfie 📸",
  "Say something sweet 💕",
  "Hug me virtually 🤗",
  "Compliment me 🥰",
  "Sing a love song 🎵",
  "Share a memory 📝",
  "Dance for 10 sec 💃",
  "Draw a heart ❤️",
  "Tell me your favorite thing 🌹",
  "Text me a love emoji 💌",
  "Make a promise 💖"
];

const wheel = document.getElementById("wheel");
const resultDiv = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");

// Create slices dynamically
dares.forEach((text, i) => {
  const slice = document.createElement("div");
  slice.className = "slice";
  slice.style.transform = `rotate(${i*30}deg)`; // 12 slices, 360/12=30deg each
  slice.textContent = text;
  wheel.appendChild(slice);
});

// Spin wheel
spinBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * dares.length);
  const degree = 3600 + randomIndex * 30; // multiple spins + slice
  wheel.style.transform = `rotate(${degree}deg)`;

  setTimeout(() => {
    resultDiv.textContent = dares[randomIndex];
  }, 4000);
});
