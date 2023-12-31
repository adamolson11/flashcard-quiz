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


//this is is for the high scores link. 
var showHighScoreLink = document.getElementById('showHighScoreCard');
var homePageCard = document.getElementById('Home-Page-Card');
var showHomePage= document.getElementById('High-Scores'); 

var timeOutPage = document.getElementById('Time-Is-Up');
var timerInterval;
var timerActive = false;
var penaltySeconds = 2;
var correctAnswers = 0;
var secondsLeft
// var highScoreForm = document.querySelector("#High-Scores");
// var highScoreList = document.querySelector("#high-score-list");
// var highScoreCountSpan = document.querySelector("#high-score-count");

// var storeHighScores = []; these will be used for storage of local memory.


//not a function but an event listener 
showHighScoreLink.addEventListener('click',function(event){
  event.preventDefault(); //this allows the code to know it is a card and not a link? I believe.
    homePageCard.style.display= 'none'; 
    showHomePage.style.display ='block';
})


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
    answerButton.addEventListener('click', handleAnswerClick);
    listItem.appendChild(answerButton);
    answerList.appendChild(listItem);
  });

  cardContent.appendChild(answerList);
  quizCardsContainer.innerHTML = '';
  quizCardsContainer.appendChild(cardContent);

}

function showAllDonePage() {
  quizCardsContainer.innerHTML = '';

  var allDoneContent = document.getElementById('All-Done').innerHTML;

  quizCardsContainer.innerHTML = allDoneContent;

  var startOverButton = document.querySelector(' #All-Done-Start-Over-Button');
  startOverButton.addEventListener('click', startOver);


    clearInterval(timerInterval);
  

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
  secondsLeft = 30;

  function setTime() {
    timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = secondsLeft + ' Until time is up and the quiz ends';

      if (secondsLeft <= 0) {
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



function loadHighScores() {
  const text = document.getElementById("initials-And-Score");

  // Get the data from local storage with the key "userData"
  const existingData = localStorage.getItem("userData");

  // If there is data in local storage, parse it from JSON and join it as a string to display in the input field
  if (existingData) {
    const userData = JSON.parse(existingData);
    text.value = userData.join(", "); // Display high scores as a comma-separated string
  }
}



// Add event listener to the "Save" button
const saveButton = document.getElementById("Save");
saveButton.addEventListener("click", storeHighScores);



function displayHighScores(userData) {
  const highScoresContainer = document.getElementById("high-Scores-Container");
  highScoresContainer.innerHTML = ""; 

 
  userData.forEach((highScore) => {
      const listItem = document.createElement("li");
      listItem.textContent = highScore;
      highScoresContainer.appendChild(listItem);
  });
}

function storeHighScores() {
  const text = document.getElementById("initials-And-Score");
  const newHighScore = text.value.trim(); 

  if (newHighScore !== "") {
   
    let existingData = localStorage.getItem("userData");
    let userData = existingData ? JSON.parse(existingData) : [];

    userData.push(newHighScore);
    localStorage.setItem("userData", JSON.stringify(userData));
    displayHighScores(userData); 
    text.value = ""; 
  }
}

// Function to go back to the home page
function goBackToHomePage() {
  // Show the home page card and hide the high scores card
  homePageCard.style.display = 'block';
  showHomePage.style.display = 'none';

  // Clear the text box for initials and score
  const text = document.getElementById("initials-And-Score");
  text.value = "";
}


function clearHighScores() {
  localStorage.removeItem("userData");

 
  const highScoresContainer = document.getElementById("high-Scores-Container");
  highScoresContainer.innerHTML = "";
}





window.addEventListener("load", function () {
  const existingData = localStorage.getItem("userData");
  const userData = existingData ? JSON.parse(existingData) : [];
  displayHighScores(userData);
});


// Load high scores when the page is loaded
window.addEventListener("load", loadHighScores);
// Add event listener to the "Go Back" button
document.getElementById('Go-Back').addEventListener('click', goBackToHomePage);

// Add event listener to the "Clear High Scores" button
document.getElementById('Clear-High-Scores').addEventListener('click', clearHighScores);
