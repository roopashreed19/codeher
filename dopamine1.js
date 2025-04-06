
const messages = [
    "You studied 45 mins — well done!",
    "Great job! 30 minutes of focused study makes a difference.",
    "Keep going! Your progress is impressive.",
    "Take a 5-minute break, you've earned it!",
    "Success is the sum of small efforts repeated day in and day out."
];

const trivia = [
    "Did you know? The human brain is capable of storing the equivalent of 2.5 million gigabytes of data.",
    "Trivia: Studies show that learning something new strengthens your brain.",
    "Brain Fact: Your brain is more active while you're asleep than when you're awake!"
];

const productivityTips = [
    "Try the Pomodoro technique: study for 25 minutes, then take a 5-minute break.",
    "Use the 'two-minute rule': If it takes less than two minutes, do it right away.",
    "Write down your goals every morning to stay focused throughout the day."
];

const toppersTips = [
    "Topper’s Tip: Make a schedule and stick to it, consistency is key.",
    "Topper’s Tip: Focus on understanding concepts, not just memorizing them.",
    "Topper’s Tip: Take regular breaks to keep your mind fresh and productive."
];


const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: 1
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
        correctAnswer: 0
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Whale", "Giraffe", "Shark"],
        correctAnswer: 1
    }
];

let currentQuizIndex = 0;
let score = 0;

function startQuiz() {
    document.getElementById("quizSection").classList.remove("hidden");
    document.getElementById("extraInfo").classList.add("hidden");
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuizIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(optionButton);
    });

    document.getElementById("nextQuestionBtn").classList.add("hidden");
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuizIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        alert("Correct! Well done.");
    } else {
        alert("Oops! Incorrect. Try again.");
    }

    document.getElementById("nextQuestionBtn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < quizQuestions.length) {
        showQuestion();
    } else {
        alert(`Quiz finished! Your score is ${score} out of ${quizQuestions.length}.`);
        document.getElementById("quizSection").classList.add("hidden");
        currentQuizIndex = 0;
        score = 0;
    }
}



let currentMessageIndex = 0;
function nextMessage() {
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    document.getElementById("dopamineMessage").textContent = messages[currentMessageIndex];
}

function showTrivia() {
    const extraInfo = document.getElementById("extraInfo");
    extraInfo.classList.remove("hidden");
    extraInfo.textContent = trivia[Math.floor(Math.random() * trivia.length)];
}

function showTip() {
    const extraInfo = document.getElementById("extraInfo");
    extraInfo.classList.remove("hidden");
    extraInfo.textContent = productivityTips[Math.floor(Math.random() * productivityTips.length)];
}

function showToppersTip() {
    const extraInfo = document.getElementById("extraInfo");
    extraInfo.classList.remove("hidden");
    extraInfo.textContent = toppersTips[Math.floor(Math.random() * toppersTips.length)];
}
function showMemes() {
  
    const memesContainer = document.querySelector('.memes-container');
    memesContainer.classList.toggle('hidden');
}


