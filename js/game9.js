const reasons = [
  "You make my bad days softer 💖",
  "Life feels warmer with you 🌸",
  "You understand me deeply ✨",
  "Your smile is my favorite view 😊",
  "You make me feel safe 🤍",
  "You believe in my dreams 💫",
  "Your voice calms my heart 🎶",
  "You are my comfort place 🫶",
  "You love me as I am 💕",
  "You make ordinary moments special 🌷",
  "You choose me every day ❤️",
  "You are my forever 💍"
];

const hearts = document.querySelectorAll(".heart");
const reasonText = document.getElementById("reasonText");

hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    hearts.forEach(h => h.classList.remove("active"));
    heart.classList.add("active");

    const index = heart.dataset.index;
    reasonText.textContent = reasons[index];
  });
});
