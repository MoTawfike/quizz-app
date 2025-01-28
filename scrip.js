const quizContainer = document.getElementById("quiz-container");
const timerElement = document.getElementById("time-left");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");

// Define the questions, options, and correct answers
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

// Display a question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">${question.question}</h2>
      <div class="space-y-3">
        ${question.options
          .map(
            (option) => `
          <button onclick="handleAnswer('${option}')" class="w-full bg-gray-200 hover:bg-gray-300 text-left p-3 rounded-lg">
            ${option}
          </button>
        `
          )
          .join("")}
      </div>
    </div>
  `;
  startTimer();
}

// Handle user's answer
function handleAnswer(selectedAnswer) {
  clearInterval(timer);
  const question = questions[currentQuestionIndex];
  if (selectedAnswer === question.answer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    timeLeft = 10;
    displayQuestion();
  } else {
    showResult();
  }
}

// Start the timer for each question
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleAnswer(null); // Move to the next question if time runs out
    }
  }, 1000);
}

// Show the final result
function showResult() {
  quizContainer.innerHTML = "";
  timerElement.classList.add("hidden");
  resultElement.classList.remove("hidden");
  scoreElement.textContent = score;
  totalQuestionsElement.textContent = questions.length;
}

// Start the quiz
displayQuestion();
