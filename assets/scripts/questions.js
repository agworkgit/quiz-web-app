// Commonly used data types DO NOT include:
// 1. strings
// 2. booleans
// 3. alerts - correct
// 4. numbers

// The condition in an if / else statement is eclosed within ____?
// 1. quotes
// 2. curly brackets
// 3. parantheses - correct
// 4. square brackets

// Arrays in JavaScript can be used to store ____?
// 1. numbers and strings
// 2. other arrays
// 3. booleans
// 4. all of the above - correct

// String values must be enclosed within ___ when being assigned to variables.
// 1. commas
// 2. curly brackets
// 3. quotes - correct
// 4. parantheses

// A very useful tool used during development and debugging for printing content to the debugger is:
// 1. JavaScript
// 2. terminal/bash - correct
// 3. for loops
// 4. console.log

// Audio Files
const startAudio = new Audio('assets/audio/start.wav');
const correctAudio = new Audio('assets/audio/correct.wav');
const wrongAudio = new Audio('assets/audio/incorrect.wav');

// Start Button Logic

document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", function () {
        let hideStartScreen = document.getElementById("quiz-intro");
        hideStartScreen.classList.add("hide");
        let showQuizScreen = document.getElementById("quiz-screen");
        showQuizScreen.classList.remove("hide");
        // Play Audio
        startAudio.play();
        // Start Timer
        startCountdown(50);
    });
});

// Timer Logic
const countdown = document.getElementById("countdown");
let countdownValue = 50; // Set initial countdown value
let countdownInterval; // Store the interval ID

function startCountdown(seconds) {
    countdownValue = seconds;
    countdown.textContent = countdownValue;

    countdownInterval = setInterval(() => {
        if (countdownValue > 0) {
            countdownValue--;
            countdown.textContent = countdownValue;
        } else {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

// Storing the quiz in an array of objects
const quizData = [
    {
        // Question
        question: "Commonly used data types DO NOT include:",
        // Answers
        a: "strings",
        b: "booleans",
        c: "alerts",
        d: "numbers",
        // Correct Answer
        correct: "alerts",
    },
    {
        // Question
        question: "The condition in an if / else statement is enclosed within ____?",
        // Answers
        a: "quotes",
        b: "curly brackets",
        c: "parantheses",
        d: "square brackets",
        // Correct Answer
        correct: "parantheses",
    },
    {
        // Question
        question: "Arrays in JavaScript can be used to store ____?",
        // Answers
        a: "numbers and strings",
        b: "other arrays",
        c: "booleans",
        d: "all of the above",
        // Correct Answer
        correct: "all of the above",
    },
    {
        // Question
        question:
            "String values must be enclosed within ___ when being assigned to variables.",
        // Answers
        a: "commas",
        b: "curly brackets",
        c: "quotes",
        d: "parantheses",
        // Correct Answer
        correct: "quotes",
    },
    {
        // Question
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        // Answers
        a: "JavaScript",
        b: "terminal/bash",
        c: "for loops",
        d: "console.log",
        // Correct Answer
        correct: "terminal/bash",
    },
];

// Question Area 1
let questionEl = document.getElementById("question-text");
// questionEl.textContent = quiz[0].question;
// JSON.stringify(quiz[0].q_1).replace(/\"/g, "")

// Answer Area
let answerText1 = document.getElementById("answer1");
let answerText2 = document.getElementById("answer2");
let answerText3 = document.getElementById("answer3");
let answerText4 = document.getElementById("answer4");

// Question Area
let currentQuestion = 0;

loadQuiz();

function loadQuiz() {
    const currentQuestionData = quizData[currentQuestion];
    questionEl.textContent = currentQuestionData.question;
    answerText1.textContent = currentQuestionData.a;
    answerText2.textContent = currentQuestionData.b;
    answerText3.textContent = currentQuestionData.c;
    answerText4.textContent = currentQuestionData.d;
}

let answerGroup = document.getElementsByClassName("answer-btns");
Array.from(answerGroup).forEach((button) => {
    button.addEventListener("click", answerClick);
});

function answerClick() {
    const selectedAnswer = this.textContent;
    const currentQuestionData = quizData[currentQuestion];

    // Check if the selected answer is correct
    if (selectedAnswer === currentQuestionData.correct) {
        // Update feedback
        document.getElementById("feedback-text").textContent = "Correct!";
        // Update text style
        let correctAnswerStyle = document.getElementById("feedback-text");
        correctAnswerStyle.classList.add("correct-answer");
        correctAudio.play();
    } else {
        // Update feedback and penalize 10 seconds
        document.getElementById("feedback-text").textContent = "Wrong!";
        // Update text style
        let wrongAnswerStyle = document.getElementById("feedback-text");
        wrongAnswerStyle.classList.add("wrong-answer");
        const currentCountdown = parseInt(countdown.textContent, 10);
        wrongAudio.play();

        // Ensure that the countdown won't go below 0
        countdownValue = Math.max(0, currentCountdown - 10);
        countdown.textContent = countdownValue;
    }

    // Move to the next question
    currentQuestion++;

    // Load the next question or move to the results screen
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

function showResults() {
    // Hide the quiz screen
    let hideQuizScreen = document.getElementById('quiz-screen');
    hideQuizScreen.classList.add('hide');

    // Show the results screen
    let showResultScreen = document.getElementById('quiz-finish');
    showResultScreen.classList.remove('hide');

    // Clear the countdown interval
    clearInterval(countdownInterval);

    // Capture the remaining seconds before setting to 0
    const remainingSeconds = countdownValue;

    // Set the countdown value to 0
    countdownValue = 0;
    countdown.textContent = countdownValue;

    // Calculate and display the final score using remaining seconds
    const finalScore = remainingSeconds;

    // Display the final score and remaining seconds
    const userDataContainer = document.getElementById('user-data');
    userDataContainer.innerHTML = `<p>Your final score is ${finalScore}.</p>
        <label for="name-input">Enter your initials:</label>
        <input type="text" name="user-name" id="name-input" />
        <input type="submit" id="submit-btn" onclick="saveScore('${finalScore}')" />`;
};

function saveScore(finalScore) {
    const initialsInput = document.getElementById('name-input');
    const initials = initialsInput.value.trim();

    // Check if initials are provided
    if (initials !== "") {
        // Get existing scores from localStorage or initialize an empty array
        const scores = JSON.parse(localStorage.getItem('scores')) || [];

        // Add the new score
        scores.push({ initials, score: finalScore });

        // Sort scores in descending order
        scores.sort((a, b) => b.score - a.score);

        // Save the updated scores back to localStorage
        localStorage.setItem('scores', JSON.stringify(scores));

        // Redirect to the highscores page (scores.html)
        window.location.href = "./scores.html";
    } else {
        alert("Please enter your initials.");
    }
};