const reasons = [
  "You make me smile even on my worst days 💕",
  "Your care makes my world feel safe 💖",
  "You understand me without words ✨",
  "You make love feel effortless ❤️",
  "Your laughter is my favorite sound 🎶",
  "You believe in me when I don’t 💫",
  "Life feels warmer with you 🌸",
  "You are my forever promise 💍"
];

const hearts = document.querySelectorAll(".heart");
const reasonText = document.getElementById("reasonText");

hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    hearts.forEach(h => h.classList.remove("active"));
    heart.classList.add("active");

    const index = heart.getAttribute("data-index");
    reasonText.textContent = reasons[index];
  });
});
