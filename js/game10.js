const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

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
  "Tell me your favorite thing about me 🌹",
  "Text me a love emoji 💌",
  "Make a promise 💖"
];

let spinning = false;

spinBtn.addEventListener("click", () => {
  if(spinning) return;
  spinning = true;

  // Random degree between 5000 and 8000 for multiple spins
  const randomDegree = Math.floor(Math.random() * 360) + 360 * 10;
  wheel.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  // Wait until animation finishes
  setTimeout(() => {
    const actualDeg = randomDegree % 360;
    const sliceSize = 360 / dares.length;
    const index = Math.floor((360 - actualDeg) / sliceSize) % dares.length;
    resultDiv.textContent = dares[index];
    spinning = false;
  }, 5000);
});
