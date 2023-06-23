var quizData = [
  {
    question: "Question 1: Commonly used data types DO NOT include:",
    answers: [
      { id: "Q1A", text: "strings", correct: false },
      { id: "Q1B", text: "booleans", correct: true },
      { id: "Q1C", text: "alerts", correct: false },
      { id: "Q1D", text: "numbers", correct: false },
    ],
  },
  {
    question: "Question 2: Which is the largest planet in our solar system?",
    answers: [
      { id: "Q2A", text: "Jupiter", correct: true },
      { id: "Q2B", text: "Mars", correct: false },
      { id: "Q2C", text: "Saturn", correct: false },
      { id: "Q2D", text: "Venus", correct: false },
    ],
  },
  {
    question: "Question 3: Who painted the Mona Lisa?",
    answers: [
      { id: "Q3A", text: "Leonardo da Vinci", correct: true },
      { id: "Q3B", text: "Pablo Picasso", correct: false },
      { id: "Q3C", text: "Vincent van Gogh", correct: false },
      { id: "Q3D", text: "Michelangelo", correct: false },
    ],
  },
  {
    question: "Question 4: Which is the largest ocean on Earth?",
    answers: [
      { id: "Q4A", text: "Pacific Ocean", correct: true },
      { id: "Q4B", text: "Atlantic Ocean", correct: false },
      { id: "Q4C", text: "Indian Ocean", correct: false },
      { id: "Q4D", text: "Arctic Ocean", correct: false },
    ],
  },
  {
    question: "Question 5: What is the symbol for the chemical element Iron?",
    answers: [
      { id: "Q5A", text: "Fe", correct: true },
      { id: "Q5B", text: "Ag", correct: false },
      { id: "Q5C", text: "Au", correct: false },
      { id: "Q5D", text: "Pb", correct: false },
    ],
  },
];// Add more questions here


var cardIndex = 0; // Track the index of cards (quiz cards)
var quizCardsContainer = document.getElementById('quiz-cards-container');
var messageContainer = document.getElementById('message-container');
var resultContainer = document.getElementById('result-container');

function handleAnswerClick(event) {
  var selectedButtonId = event.target.id;
  var currentQuestion = quizData[cardIndex];

  var selectedAnswer = currentQuestion.answers.find(function (answer) {
    return answer.id === selectedButtonId;
  });

  if (selectedAnswer.correct) {
    resultContainer.textContent = "Correct!";
  } else {
    resultContainer.textContent = "Incorrect!";
  }

  cardIndex++; // Move to the next card

  if (cardIndex < quizData.length) {
    displayCard(cardIndex); // Display the next card
  } else {
    showMessage('End of quiz!');
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

function showMessage(message) {
  messageContainer.textContent = message;
}

document.getElementById('Home-Page-Button').addEventListener('click', function () {
  var homePageCard = document.getElementById('Home-Page-Card');
  homePageCard.style.display = 'none';

  displayCard(cardIndex); // Display the initial card
});
