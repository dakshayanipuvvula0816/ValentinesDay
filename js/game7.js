const board = document.getElementById("gameBoard");

const images = [
  "1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg",
  "6.jpeg","7.jpeg","8.jpeg","9.jpeg","10.jpeg"
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
          alert("You matched all our hearts 💖");
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
