const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

const actions = [
  "💋 Kiss",
  "🤳 Take a Selfie",
  "💌 Sweet Words",
  "🤗 Hug",
  "😊 Compliment",
  "🎵 Sing a Song",
  "💃 Dance",
  "🍫 Chocolate Treat",
  "📝 Love Note",
  "📸 Cute Photo",
  "🕯️ Romantic Moment",
  "🔥 Surprise Kiss"
];

let rotation = 0;

document.getElementById("spinBtn").addEventListener("click", () => {
  const spin = Math.floor(Math.random() * 360) + 1440;
  rotation += spin;

  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const degrees = rotation % 360;
    const slice = Math.floor((360 - degrees) / 30) % 12;

    const number = slice + 1;
    result.innerHTML = `❤️ ${actions[slice]}`;
  }, 4000);
});

// Restart button
const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => window.location.reload());
}
