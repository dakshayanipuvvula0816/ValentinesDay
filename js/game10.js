const wheel = document.getElementById("wheel");
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
  "Tell me your favorite thing 🌹",
  "Text me a love emoji 💌",
  "Make a promise 💖"
];

wheel.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * dares.length);
  const degree = 3600 + randomIndex * 30; // 30 deg per slice, plus multiple spins
  wheel.style.transform = `rotate(${degree}deg)`;

  setTimeout(() => {
    resultDiv.textContent = dares[randomIndex];
  }, 4000); // show result after spin
});
