/* public/script.js */

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('register-btn').addEventListener('click', register);
    document.getElementById('login-btn').addEventListener('click', login);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
});

let currentQuestionIndex = 0;
let questions = [];

function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    });
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert('Login fallido');
        }
    });
}

function showQuiz() {
    document.getElementById('register-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    fetchQuestions();
}

function fetchQuestions() {
    fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        showQuestion();
    });
}

function showQuestion() {
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const nextBtn = document.getElementById('next-btn');

    questionElement.textContent = questions[currentQuestionIndex].question;
    choicesElement.innerHTML = '';

    questions[currentQuestionIndex].choices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => selectAnswer(li));
        choicesElement.appendChild(li);
    });

    nextBtn.style.display = 'none';
}

function selectAnswer(selectedLi) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const choicesElement = document.getElementById('choices');

    Array.from(choicesElement.children).forEach(li => {
        li.style.backgroundColor = li.textContent === correctAnswer ? 'lightgreen' : 'lightcoral';
        li.style.pointerEvents = 'none';
    });

    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '<h2>¡Has completado el juego!</h2>';
}
