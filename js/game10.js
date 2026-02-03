const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const spinBtn = document.getElementById("spinBtn");

const actions = [
  "💋 Kiss",
  "🤳 Selfie",
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

spinBtn.addEventListener("click", () => {
  result.innerText = "";
  const spin = Math.floor(Math.random() * 360) + 1440;
  rotation += spin;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const actual = rotation % 360;
    const index = Math.floor((360 - actual) / 30) % 12;
    result.innerText = `💖 ${actions[index]} 💖`;
  }, 4000);
});
