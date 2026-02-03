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
  if (score === 10) {
    result.innerText = "💖 Perfect! You know us by heart 💍";
  } else if (score >= 8) {
    result.innerText = "🥰 Amazing! Love is strong between us 💕";
  } else {
    result.innerText = "😜 Hmm… we need more dates together!";
  }
  submitBtn.style.display = "none";
}

loadQuestion();
