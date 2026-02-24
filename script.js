const questions = [
    {
        question: "Who is the biggest stupid",
        options: ["Me", "You", "Both of us"],
        answer: 2 // Fixed to 2 (0-indexed)
    },
    {
        question: "Who is the bigger babi?",
        options: ["You", "Me", "Yes"],
        answer: 2 // Fixed to 2 (0-indexed)
    },
    {
        question: "Where do I want to go with you next?",
        options: ["Bali", "Hongkong", "Tokyo"],
        answer: 2
    },
    {
        question: "What should I eat tomorrow",
        options: ["Cai Png", "Bak Chor Mee", "Mala", "Something else"],
        answer: 2
    },
    {
        question: "Who is more likely to fall asleep",
        options: ["Me", "You"],
        answer: 1 // Fixed to 1 (0-indexed)
    }
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCounter = document.getElementById('question-counter');
const progress = document.getElementById('progress');

const scoreNumber = document.getElementById('score-number');
const totalQuestions = document.getElementById('total-questions');
const resultMessage = document.getElementById('result-message');


// Floating Hearts Animation
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts-container');
    const heartSymbols = ['❤️', '💖', '✨', '🌸'];

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Randomize position, size, and animation duration
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';

        container.appendChild(heart);

        // Remove after animation completes
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 500);
}

function showScreen(screen) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        setTimeout(() => {
            if (!s.classList.contains('active')) s.style.display = 'none';
        }, 500); // Wait for fade out
    });

    // Show target screen
    setTimeout(() => {
        screen.style.display = 'block';
        // Trigger reflow
        void screen.offsetWidth;
        screen.classList.add('active');
    }, 500); // Slight delay for smooth transition
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.innerText = q.question;
    questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    // Update progress bar
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progress.style.width = `${progressPercent}%`;

    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = option;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedIndex, btn) {
    const q = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.answer;

    // Disable all buttons
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        // highlight correct answer
        allBtns[q.answer].classList.add('correct');
    }

    // Update progress conditionally based on timing or wait till next question.
    // In this case, progress bar updates just before the next question loads

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    progress.style.width = '100%';

    setTimeout(() => {
        showScreen(resultScreen);
        scoreNumber.innerText = score;
        totalQuestions.innerText = questions.length;

        let message = "";
        if (score === questions.length) {
            message = "Perfect score! You are big stupid";
        } else if (score >= questions.length / 2) {
            message = "Do you even love me?";
        } else {
            message = "You dont love me...";
        }
        resultMessage.innerText = message;
    }, 50);
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

// Initialize
createFloatingHearts();
