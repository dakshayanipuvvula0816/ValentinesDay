const songs = [
  { clue: "🎵 'Cause all of me loves all of you", answer: "All of Me – John Legend" },
  { clue: "🎶 I found a love, for me", answer: "Perfect – Ed Sheeran" },
  { clue: "💖 You are my fire, the one desire", answer: "I Want It That Way – BSB" },
  { clue: "🎼 We were both young when I first saw you", answer: "Love Story – Taylor Swift" },
  { clue: "🎧 Take my hand, take my whole life too", answer: "All of Me – John Legend" },
  { clue: "💞 Darling, you look perfect tonight", answer: "Perfect – Ed Sheeran" },
  { clue: "🎵 It's you, it's you, it's all for you", answer: "Video Games – Lana Del Rey" },
  { clue: "🎶 Can I go where you go?", answer: "Lover – Taylor Swift" },
  { clue: "💖 You make me feel like I'm living a teenage dream", answer: "Teenage Dream – Katy Perry" },
  { clue: "🎧 I could stay awake just to hear you breathing", answer: "I Don't Want to Miss a Thing – Aerosmith" }
];

let index = 0;
let score = 0;

const clueEl = document.getElementById("clue");
const revealEl = document.getElementById("reveal");
const progressEl = document.getElementById("progress");

function loadSong() {
  revealEl.classList.add("hidden");
  clueEl.textContent = songs[index].clue;
  progressEl.textContent = `Song ${index + 1} of ${songs.length}`;
}

function knowSong() {
  score++;
  reveal();
}

function skipSong() {
  reveal();
}

function reveal() {
  revealEl.textContent = songs[index].answer;
  revealEl.classList.remove("hidden");

  setTimeout(() => {
    index++;
    if (index < songs.length) {
      loadSong();
    } else {
      showResult();
    }
  }, 1200);
}

function showResult() {
  let message = "";

  if (score === 10) {
    message = "💍 Soulmate alert! You know love songs by heart 💖";
  } else if (score >= 8) {
    message = "💕 Romantic legend! Almost perfect 🎶";
  } else {
    message = "🎧 We need more love songs together 💖";
  }

  clueEl.textContent = `Your Score: ${score}/10`;
  revealEl.textContent = message;
  revealEl.classList.remove("hidden");
  progressEl.textContent = "";
}

loadSong();
