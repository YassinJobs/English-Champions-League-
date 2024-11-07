const questions = [
    {
        question: "What is the capital of England?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: 1
    },
    {
        question: "Which of these is NOT a color?",
        options: ["Blue", "Green", "Red", "Square"],
        correct: 3
    },
    {
        question: "What is the past tense of 'eat'?",
        options: ["Eated", "Ate", "Eaten", "Eating"],
        correct: 1
    },
    {
        question: "Which word is a synonym for 'happy'?",
        options: ["Sad", "Angry", "Joyful", "Tired"],
        correct: 2
    },
    {
        question: "What is the opposite of 'big'?",
        options: ["Large", "Huge", "Gigantic", "Small"],
        correct: 3
    },
    {
        question: "Which of these is a fruit?",
        options: ["Carrot", "Potato", "Apple", "Broccoli"],
        correct: 2
    },
    {
        question: "What is the plural of 'child'?",
        options: ["Childs", "Children", "Childen", "Childies"],
        correct: 1
    },
    {
        question: "Which word means 'to look for'?",
        options: ["Search", "Watch", "Listen", "Speak"],
        correct: 0
    },
    {
        question: "What is the third person singular of 'go'?",
        options: ["Go", "Goes", "Went", "Going"],
        correct: 1
    },
    {
        question: "Which of these is a day of the week?",
        options: ["January", "Summer", "Tuesday", "Morning"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let timer;
const userAnswers = new Array(questions.length).fill(null);

function startCompetition() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];
    let html = `<div class="question"><h2>Question ${currentQuestionIndex + 1}</h2><p class="sub-question">${question.question}</p></div>`;
    html += '<ul class="options">';
    question.options.forEach((option, index) => {
        html += `<li onclick="selectAnswer(${index})">${option}</li>`;
    });
    html += '</ul>';
    questionContainer.innerHTML = html;
    document.getElementById('nextBtn').style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    document.getElementById('submitBtn').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

function selectAnswer(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;
    const options = document.querySelectorAll('.options li');
    options.forEach((option, index) => {
        if (index === questions[currentQuestionIndex].correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== questions[currentQuestionIndex].correct) {
            option.classList.add('incorrect');
        }
        option.onclick = null;
    });
    
}

function navigateQuestion(direction) {
    currentQuestionIndex += direction;
    loadQuestion();
}

function submitQuiz() {
    clearInterval(timer);
    const correctAnswersCount = userAnswers.filter((answer, index) => answer === questions[index].correct).length;
    document.getElementById('result').innerHTML = `You answered ${correctAnswersCount} out of ${questions.length} questions correctly.`;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
}

function startTimer() {
    let timeInSeconds = 30 * 60; // 30 minutes in seconds
    const timerElement = document.getElementById('timer');

    timer = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerElement.textContent = `${minutes}:${seconds}`;

        if (timeInSeconds === 0) {
            clearInterval(timer);
            submitQuiz();
        } else {
            timeInSeconds--;
        }
    }, 1000);
}