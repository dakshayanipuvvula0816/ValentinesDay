const songs = [
  { clue: "🎵 I am under the moonlight, but it is very warm when I think about you", answer: "Em sandeham ledu" },
  { clue: "🎶 For someone you seem like a dream, For someone you seem like a flowing breeze", answer: "Te-Amo" },
  { clue: "💖 Don’t know why l feel l got wings today only… Strangely I’m touching the sky", answer: "Yemito Ivala" },
  { clue: "🎼 The heart is running,It has found a boon", answer: "Urike Urike" },
  { clue: "🎧 Today I was born again", answer: "Kannula munde" },
  { clue: "💞 Darling, you look perfect tonight", answer: "Perfect – Ed Sheeran" },
  { clue: "🎵 It's you, it's you, it's all for you", answer: "Video Games – Lana Del Rey" },
  { clue: "🎶 It feels like love, immersing me in imagination, while your smile falls on me like a raindrop", answer: "Cheliya" },
  { clue: "💖 Darling,just kiss me slow", answer: "Perfect" },
  { clue: "🎧 All of a sudden, Anger on the girl's nose", answer: "Adento kani" }
];

let index = 0;
let score = 0;
let answered = false;

// One audio per song: user should add audio/audio1.mp3 ... audio/audio10.mp3
const audioFiles = songs.map((_, i) => {
  const audio = new Audio(`audio/audio${i + 1}.mp3`);
  audio.preload = "auto";
  return audio;
});
let currentAudio = null;

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

   // Play the corresponding song when user knows it
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  const audio = audioFiles[index];
  currentAudio = audio;
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay errors; user interaction already happened
    });
  }

  score++;
  revealAnswer();
}

function skipSong() {
  if (answered) return;

  // Stop any playing audio when skipping
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

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
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
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

// Restart button
const restartBtn = document.getElementById("restartBtn");
if (restartBtn) {
  restartBtn.addEventListener("click", () => window.location.reload());
}
