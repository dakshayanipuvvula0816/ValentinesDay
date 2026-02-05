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
let answered = false;

const clueEl = document.getElementById("clue");
const revealEl = document.getElementById("reveal");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

function loadSong() {
  answered = false;
  revealEl.classList.add("hidden");
  nextBtn.classList.add("hidden");

  clueEl.textContent = songs[index].clue;
  progressEl.textContent = `Song ${index + 1} of ${songs.length}`;
}

function knowSong() {
  if (answered) return;
  score++;
  revealAnswer();
}

function skipSong() {
  if (answered) return;
  revealAnswer();
}

function revealAnswer() {
  answered = true;
  revealEl.textContent = songs[index].answer;
  revealEl.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

function nextSong() {
  index++;

  if (index < songs.length) {
    loadSong();
  } else {
    showResult();
  }
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
  nextBtn.classList.add("hidden");
}

loadSong();
