const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

const actions = {
  1: "💋 Kiss",
  2: "🤳 Take a Selfie",
  3: "💌 Sweet Words",
  4: "🤗 Hug",
  5: "😊 Compliment",
  6: "🎵 Sing a Song",
  7: "💃 Dance",
  8: "🍫 Chocolate Treat",
  9: "📝 Love Note",
  10: "📸 Cute Photo",
  11: "🕯️ Romantic Moment",
  12: "🔥 Surprise Kiss"
};

let rotation = 0;

document.getElementById("spinBtn").onclick = () => {
  const spin = Math.floor(Math.random() * 360) + 1440;
  rotation += spin;
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const actual = rotation % 360;
    const slice = Math.floor((360 - actual) / 30) + 1;
    result.innerText = `Number ${slice} → ${actions[slice]}`;
  }, 4000);
};
