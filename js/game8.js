const quiz = [
  {
    q: "Where did we first meet? 💕",
    options: ["School", "Online", "Work", "Party"],
    answer: 1
  },
  {
    q: "Who said 'I love you' first? ❤️",
    options: ["Me", "You", "Both", "Don't remember"],
    answer: 0
  },
  {
    q: "Our favorite thing to do together?",
    options: ["Travel", "Talk", "Eat", "Sleep"],
    answer: 1
  },
  {
    q: "What makes me happiest? 😊",
    options: ["Food", "You", "Sleep", "Music"],
    answer: 1
  },
  {
    q: "Our favorite song together? 🎵",
    options: ["Song A", "Song B", "Song C", "Song D"],
    answer: 2
  },
  {
    q: "Who gets angry first? 😅",
    options: ["Me", "You", "Both", "No one"],
    answer: 0
  },
  {
    q: "What do I love most about you? 💖",
    options: ["Smile", "Care", "Attitude", "Everything"],
    answer: 3
  },
  {
    q: "Our dream trip destination? ✈️",
    options: ["Paris", "Beach", "Mountains", "Home"],
    answer: 0
  },
  {
    q: "Who is more dramatic? 🎭",
    options: ["Me", "You", "Both", "None"],
    answer: 1
  },
  {
    q: "Are you mine forever? 💍",
    options: ["Yes", "Always", "Forever", "All of these"],
    answer: 3
  }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const submitBtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

function loadQuestion() {
  const q = quiz[current];
  questionEl.innerText = q.q;
  options.forEach((btn, i) => {
    btn.innerText = q.options[i];
  });
}

function selectAnswer(index) {
  if (index === quiz[current].answer) {
    score++;
  }
  current++;
  if (current < quiz.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-box").style.display = "none";
    submitBtn.style.display = "inline-block";
  }
}

function submitQuiz() {
  let text = "";
  if (score === 10) {
    text = "💖 Perfect! You know us by heart 💍";
  } else if (score >= 8) {
    text = "🥰 Amazing! Love is strong between us 💕";
  } else {
    text = "😜 Hmm… we need more dates together!";
  }
  result.innerText = text;
  submitBtn.style.display = "none";
  showFinalMessage(text);
}

loadQuestion();

// Show centered message + confetti for the final result
function showFinalMessage(text) {
  const msgEl = document.getElementById("winMessage");
  if (!msgEl) return;
  msgEl.textContent = text;
  msgEl.classList.add("show");
  launchConfetti();
}

function launchConfetti() {
  const colors = ["#ff4d6d", "#ffb3c6", "#ffe5ec", "#ffd6e8", "#fff"];
  const count = 160;

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
