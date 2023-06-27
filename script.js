var quizData = [
  {
    question: "Question 1: Commonly used data types DO NOT include:",
    answers: [
      { id: "Q1A", text: "strings", correct: false },
      { id: "Q1B", text: "booleans", correct: true },
      { id: "Q1C", text: "alerts", correct: false },
      { id: "Q1D", text: "numbers", correct: false }
    ]
  },
  {
    question: "Question 2: The condition in an if/else statement is enclosed with _________ ?",
    answers: [
      { id: "Q2A", text: "quotes", correct: true },
      { id: "Q2B", text: "curly brackets", correct: false },
      { id: "Q2C", text: "parenthesis", correct: false },
      { id: "Q2D", text: "square brackets", correct: false }
    ]
  },
  {
    question: "Question 3: Arrays in JavaScript can be used to store _____________?",
    answers: [
      { id: "Q3A", text: "numbers and strings", correct: false },
      { id: "Q3B", text: "other arrays", correct: false },
      { id: "Q3C", text: "booleans", correct: false },
      { id: "Q3D", text: "all of the above", correct: true }
    ]
  },
  {
    question: "Question 4: A very useful tool used during development and debugging for printing content to the debugger is:?",
    answers: [
      { id: "Q4A", text: "JavaScript", correct: false },
      { id: "Q4B", text: "Terminal/bash", correct: false },
      { id: "Q4C", text: "for loops", correct: false },
      { id: "Q4D", text: "console.log", correct: true }
    ]
  },
  {
    question: "Question 5: String Values must be enclosed within __________ when being assigned to variables.?",
    answers: [
      { id: "Q5A", text: "commas", correct: true },
      { id: "Q5B", text: "curly brackets", correct: false },
      { id: "Q5C", text: "quotes", correct: false },
      { id: "Q5D", text: "parenthesis", correct: false }
    ]
  }
]; // I can add more quiz questions here if I want.


var cardIndex = 0;
var quizCardsContainer = document.getElementById('quiz-cards-container');
var messageContainer = document.getElementById('message-container');
var resultContainer = document.getElementById('result-container');
var timeOutPage = document.getElementById('Time-Is-Up');
var timerInterval;
var timerActive = false;
var penaltySeconds = 2;
var correctAnswers = 0;

function handleAnswerClick(event) {
  var selectedButtonId = event.target.id;
  var currentQuestion = quizData[cardIndex];

  var selectedAnswer = currentQuestion.answers.find(function (answer) {
    return answer.id === selectedButtonId;
  });

  if (selectedAnswer.correct) {
    resultContainer.textContent = "Correct!";
    correctAnswers++;
  } else {
    resultContainer.textContent = "Incorrect!";
    secondsLeft -= penaltySeconds;
  }

  cardIndex++;

  if (cardIndex < quizData.length) {
    displayCard(cardIndex);
  } else {
    showAllDonePage();
  }
}

function displayCard(index) {
  var currentQuestion = quizData[index];
  var cardContent = document.createElement('div');
  cardContent.classList.add('quiz-card');

  var questionHeader = document.createElement('h3');
  questionHeader.id = 'question';
  questionHeader.textContent = currentQuestion.question;
  cardContent.appendChild(questionHeader);

  var answerList = document.createElement('ul');
  answerList.classList.add('answers');

  currentQuestion.answers.forEach(function (answer) {
    var listItem = document.createElement('li');
    var answerButton = document.createElement('button');
    answerButton.classList.add('answer');
    answerButton.id = answer.id;
    answerButton.textContent = answer.text;
    listItem.appendChild(answerButton);
    answerList.appendChild(listItem);
  });

  cardContent.appendChild(answerList);
  quizCardsContainer.innerHTML = '';
  quizCardsContainer.appendChild(cardContent);

  var buttons = document.querySelectorAll('.quiz-card .answer');
  buttons.forEach(function (button) {
    button.addEventListener('click', handleAnswerClick);
  });
}

function showAllDonePage() {
  quizCardsContainer.innerHTML = '';

  var allDoneContent = document.getElementById('All-Done').innerHTML;

  quizCardsContainer.innerHTML = allDoneContent;

  var startOverButton = document.querySelector('#All-Done #Start-Over-Button');
  startOverButton.addEventListener('click', startOver);

  if (timerActive) {
    clearInterval(timerInterval);
    timerActive = false;
  }

  var finalScore = document.getElementById('result-container');
  finalScore.textContent = "Your final score is " + correctAnswers + ".";
  
  // Store scores and initials in local storage
  var userInitials = document.getElementById('initials-And-Score').value;
  var userScore = correctAnswers;
  var userData = {
    initials: userInitials,
    score: userScore
  };
  localStorage.setItem('userData', JSON.stringify(userData));
}

function startOver() {
  cardIndex = 0;
  displayCard(cardIndex);
}

document.getElementById('Home-Page-Button').addEventListener('click', function () {
  var homePageCard = document.getElementById('Home-Page-Card');
  homePageCard.style.display = 'none';

  displayCard(cardIndex);

  var timeEl = document.querySelector('.timer');
  var secondsLeft = 10;

  function setTime() {
    timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = secondsLeft + ' Until time is up and the quiz ends';

      if (secondsLeft === 0) {
        clearInterval(timerInterval);
        showTimeIsUpPage();
      }
    }, 1000);
    timerActive = true;
  }

  function showTimeIsUpPage() {
    clearInterval(timerInterval);
    quizCardsContainer.style.display = 'none';
    timeOutPage.style.display = 'block';
  }

  setTime();
});

document.getElementById('Start-Over-Button').addEventListener('click', function() {
  var homePageCard = document.getElementById('Home-Page-Card');
  homePageCard.style.display = 'block';

  var timeOutPage = document.getElementById('Time-Is-Up');
  timeOutPage.style.display = 'none';

  cardIndex = 0;
  displayCard(cardIndex);
});






