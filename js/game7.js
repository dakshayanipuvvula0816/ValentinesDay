const board = document.getElementById("gameBoard");

const images = [
  "1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg",
  "8.jpeg","9.jpeg","10.jpeg","11.jpeg","12.jpeg","13.jpeg","14.jpeg"
];

// Duplicate & shuffle
let cards = [...images, ...images];
cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

cards.forEach(img => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-face front">❤️</div>
    <div class="card-face back">
      <img src="images/${img}">
    </div>
  `;

  card.addEventListener("click", () => {
    if (lockBoard || card === firstCard) return;

    card.classList.add("flip");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    const img1 = firstCard.querySelector("img").src;
    const img2 = secondCard.querySelector("img").src;

    if (img1 === img2) {
      matchedPairs++;
      resetTurn();

      if (matchedPairs === images.length) {
        setTimeout(() => {
          showWinMessage("You matched every little heart in sync 💖");
        }, 400);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetTurn();
      }, 1000);
    }
  });

  board.appendChild(card);
});

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showWinMessage(text) {
  const msgEl = document.getElementById("winMessage");
  if (!msgEl) return;
  msgEl.textContent = text;
  msgEl.classList.add("show");
  launchConfetti();
}

function launchConfetti() {
  const colors = ["#ff4d6d", "#ffb3c6", "#ffe5ec", "#ffd6e8", "#fff"];
  const count = 140;

  for (let i = 0; i < count; i++) {
    const conf = document.createElement("div");
    conf.style.position = "fixed";
    conf.style.width = "8px";
    conf.style.height = "14px";
    conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    conf.style.left = Math.random() * 100 + "vw";
    conf.style.top = "-20px";
    conf.style.opacity = "0.9";
    conf.style.transform = "rotate(" + Math.random() * 360 + "deg)";
    conf.style.zIndex = "9999";
    document.body.appendChild(conf);

    const fallDistance = 120 + Math.random() * 40;
    const fallSide = (Math.random() - 0.5) * 80;

    conf.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        {
          transform: `translate(${fallSide}px, ${fallDistance}vh) rotate(360deg)`,
          opacity: 0
        }
      ],
      { duration: 1800 + Math.random() * 600, easing: "ease-out" }
    );

    setTimeout(() => conf.remove(), 2500);
  }
}

// Restart button
const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => window.location.reload());
}
