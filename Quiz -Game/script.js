const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "What does JS stand for?",
    options: ["Java Style", "JustScript", "JavaScript", "JScript"],
    answer: "JavaScript"
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: "Django"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

function startQuiz() {
  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Please enter your name");

  document.querySelector(".start-screen").classList.add("hidden");
  document.querySelector(".quiz-screen").classList.remove("hidden");
  document.getElementById("player-name").textContent = `Player: ${username}`;

  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsContainer.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) score += 10;
  document.getElementById("score").textContent = `Score: ${score}`;
  document.querySelectorAll("#options button").forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion();
    resetTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 15;
  document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function endQuiz() {
  clearInterval(timer);
  document.querySelector(".quiz-screen").classList.add("hidden");
  document.querySelector(".result-screen").classList.remove("hidden");
  document.getElementById("final-score").textContent = `Your score is ${score}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.querySelector(".result-screen").classList.add("hidden");
  document.querySelector(".start-screen").classList.remove("hidden");
  document.getElementById("score").textContent = "";
  document.getElementById("timer").textContent = "";
  document.getElementById("username").value = "";
}