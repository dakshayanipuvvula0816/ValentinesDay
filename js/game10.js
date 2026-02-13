const wheel = document.getElementById("wheel");
const result = document.getElementById("result");

const actions = [
  "Impersonate a Bowler",
  "Remove your shirt Hottie",
  "Recreate first moment",
  "Sing Romantic song for doro",
  "Future Date Plan",
  "Compliment Storm-30sec",
  "Secret Fantasy",
  "Future Promise",
  "Love Letter in 2 Minutes",
  "Put on a random romantic song and slow dance",
  "Post a sweet story about me",
  "Maintain eye contact for 30 seconds"
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
