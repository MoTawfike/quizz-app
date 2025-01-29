const startForm = document.getElementById("start-form");
const quizContainer = document.getElementById("quiz-container");
const timerElement = document.getElementById("time-left");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");
const progressElement = document.getElementById("progress");
const emailLinkElement = document.getElementById("email-link");
const startButton = document.getElementById("start-button");

const questions = [
    {
        question: "What is the primary function of chloroplasts in plant cells?",
        options: ["Cellular respiration", "Protein synthesis", "Photosynthesis", "Cell division"],
        answer: "Photosynthesis",
        timeLimit: 30,
    },
    {
        question: "Which molecule is responsible for carrying genetic information?",
        options: ["Protein", "Lipid", "Carbohydrate", "DNA"],
        answer: "DNA",
        timeLimit: 30,
    },
    {
        question: "What is the role of ribosomes in a cell?",
        options: ["Energy production", "Protein synthesis", "Waste removal", "Lipid storage"],
        answer: "Protein synthesis",
        timeLimit: 30,
    },
    {
        question: "Which process is responsible for the transport of water in plants?",
        options: ["Transpiration", "Respiration", "Photosynthesis", "Digestion"],
        answer: "Transpiration",
        timeLimit: 30,
    },
    {
        question: "What is the function of the mitochondria in cells?",
        options: ["Protein synthesis", "Lipid synthesis", "Energy production", "DNA replication"],
        answer: "Energy production",
        timeLimit: 30,
    },
    {
        question: "Which of the following is NOT a type of tissue?",
        options: ["Nervous tissue", "Epithelial tissue", "Muscular tissue", "Digestive tissue"],
        answer: "Digestive tissue",
        timeLimit: 30,
    },
    {
        question: "What is the process by which cells divide and multiply?",
        options: ["Mitosis", "Meiosis", "Osmosis", "Diffusion"],
        answer: "Mitosis",
        timeLimit: 30,
    },
    {
        question: "Which is the largest organ in the human body?",
        options: ["Heart", "Brain", "Liver", "Skin"],
        answer: "Skin",
        timeLimit: 30,
    },
    {
        question: "What is the role of the enzyme amylase?",
        options: ["Break down proteins", "Break down fats", "Break down carbohydrates", "Break down nucleic acids"],
        answer: "Break down carbohydrates",
        timeLimit: 30,
    },
    {
        question: "Which gas is a waste product of cellular respiration?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon dioxide",
        timeLimit: 30,
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft;
let timer;
let answeredQuestions = new Array(questions.length).fill(false);
let studentName = "";
let mobileNumber = "";

startButton.addEventListener("click", function () {
    studentName = document.getElementById("student-name").value;
    mobileNumber = document.getElementById("mobile-number").value;

    if(studentName.trim() === "" || mobileNumber.trim() === ""){
        alert("Please Enter Student Name and Mobile number")
    } else{
        startForm.classList.add("hidden");
        quizContainer.classList.remove("hidden");
        progressElement.classList.remove("hidden");
        timerElement.classList.remove("hidden");
        displayQuestion();
    }
});

// Function to update the UI
function updateUI() {
    updateProgress();
}

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
              <button onclick="handleAnswer('${option}')"
                      class="w-full bg-gray-200 hover:bg-gray-300 text-left p-3 rounded-lg"
                       id="option-${option}">
                 ${option}
              </button>
            `
        )
        .join("")}
            </div>
        </div>
    `;

    timeLeft = question.timeLimit;
    timerElement.textContent = timeLeft;
    startTimer();
    updateUI();
}
// Handle user's answer
function handleAnswer(selectedAnswer) {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    const correctButton = document.getElementById(`option-${question.answer}`);
    const selectedButton = document.getElementById(`option-${selectedAnswer}`);

    // Disable all buttons
    question.options.forEach(option => {
        const button = document.getElementById(`option-${option}`);
        button.disabled = true;
    });

    if (selectedAnswer === question.answer) {
        score++;
        selectedButton.classList.add("bg-green-300", "font-bold");
    } else {
        selectedButton.classList.add("bg-red-300", "line-through");
        correctButton.classList.add("bg-green-300", "font-bold");
    }
    answeredQuestions[currentQuestionIndex] = true;
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

// Start the timer for each question
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleAnswer(null); // Move to next question if time runs out
        }
    }, 1000);
}

// Navigate to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Display quiz progress
function updateProgress() {
    progressElement.textContent = `Question: ${currentQuestionIndex + 1} / ${questions.length}`;
}

// Show the final result
function showResult() {
    quizContainer.innerHTML = "";
    timerElement.classList.add("hidden");
    progressElement.classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.textContent = score;
    totalQuestionsElement.textContent = questions.length;
    sendEmail();
}

function sendEmail() {
    const emailSubject = `${studentName} - Exam Results`;
    const emailBody = `
      Student Name: ${studentName}
      Mobile Number: ${mobileNumber}
      Score: ${score} / ${questions.length}
    `;
    const mailtoLink = `mailto:mohamed.saeed.tawfike@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    emailLinkElement.innerHTML = `<a href="${mailtoLink}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Send Email</a>`;
}
