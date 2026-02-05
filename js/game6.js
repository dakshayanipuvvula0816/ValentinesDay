const questions = [
  {
    question: "🎵 Which song says 'Cause all of me loves all of you'?",
    options: ["All of Me", "Perfect", "Thinking Out Loud"],
    answer: 0
  },
  {
    question: "🎶 'I found a love, for me' is from?",
    options: ["Perfect", "Love Story", "Photograph"],
    answer: 0
  },
  {
    question: "💖 'You are my fire, the one desire'?",
    options: ["As Long As You Love Me", "I Want It That Way", "Baby"],
    answer: 1
  },
  {
    question: "🎼 'We were both young when I first saw you'?",
    options: ["Love Story", "Enchanted", "Blank Space"],
    answer: 0
  },
  {
    question: "🎧 'Take my hand, take my whole life too'?",
    options: ["Perfect", "All of Me", "Say You Won't Let Go"],
    answer: 1
  }
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const progress = document.getElementById("progress");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  options.forEach((btn, index) => {
    btn.textContent = q.options[index];
  });
  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
}

function selectAnswer(index) {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 You finished the Love Song Quiz! 🎶💖";
    document.querySelector(".options").style.display = "none";
    progress.textContent = "";
  }
}

loadQuestion();
