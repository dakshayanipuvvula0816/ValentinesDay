const hearts = document.querySelectorAll(".heart");
const reasonText = document.getElementById("reasonText");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    // remove active state from all hearts
    hearts.forEach((h) => h.classList.remove("active"));

    // activate clicked heart
    heart.classList.add("active");

    // show reason text
    reasonText.textContent = heart.dataset.text;
  });
});
