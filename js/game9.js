// Floating hearts generator
const floatingContainer = document.getElementById("floating-hearts");

setInterval(() => {
  const heart = document.createElement("span");
  heart.innerHTML = "♥";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 14 + Math.random() * 24 + "px";
  heart.style.animationDuration = 6 + Math.random() * 6 + "s";
  floatingContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}, 400);

// Heart click logic
const hearts = document.querySelectorAll(".heart-btn");
const reasonText = document.getElementById("reason-text");

hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    hearts.forEach(h => h.classList.remove("active"));
    heart.classList.add("active");

    reasonText.textContent = heart.dataset.reason;
  });
});
