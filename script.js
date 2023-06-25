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
var timeOutPage= document.getElementById('Time-Is-Up'); 
var timerInterval;// 

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
  showAllDonePage(); //shows the all done page instead of just a message/ 
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
  // this  Clears the quiz cards container
  quizCardsContainer.innerHTML = '';


var allDoneContent = document.getElementById('All-Done').innerHTML;

quizCardsContainer.innerHTML = allDoneContent;

var startOverButton = document.getElementById('Start-Over-Button');
startOverButton.addEventListener('click', startOver);
}

function startOver() {
  // Reset the card index and display the first card
  cardIndex = 0;
  displayCard(cardIndex);
}

document.getElementById('Home-Page-Button').addEventListener('click', function () {
  var homePageCard = document.getElementById('Home-Page-Card');
  homePageCard.style.display = 'none';

  displayCard(cardIndex); // Display the initial card

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
  }

  function showTimeIsUpPage() {
    clearInterval(timerInterval);
    quizCardsContainer.style.display = 'none';
    timeOutPage.style.display = 'block';
  }

  setTime();
});

  document.getElementById('Start-Over-Button').addEventListener('click', function() {
    // Show the home page card
    var homePageCard = document.getElementById('Home-Page-Card');
    homePageCard.style.display = 'block';
  
    // Hide the time-out message container
    var timeOutPage = document.getElementById('Time-Is-Up');
    timeOutPage.style.display = 'none';
  
    // Reset the quiz by resetting the card index
    cardIndex = 0;
  
    // Displays the initial card
    displayCard(cardIndex);

  


});



//TODO 
// *timer penalty for when they get a question wrong
// * add to the timeout nested function so that it if the user completes before time is up, then it does not display the page...
// *build an All done! page


// // *build a high scores page
// // * create a text box for entering scores and initials
// <div class="input-group">
//             <label for="initials-And-Score">Enter initials and Score:</label>
//             <input type="text" name="initials-And-Score" id="initials-And-Score" placeholder="Adam 50" />
//           </div>//put this in your html high score page
// // *build a function that stores the scores and initials 
// var resultScores
// var userInitials   
// function storeScores(){}
// //   * that function should also push the information so it is displayed on the high score page.
// //   *link the text in the home-page to the high scores page. 
// *give the questions weight so a total score can be determined.
// *add or subtract based on the user input 
// * change the font of the correct/incorrect to reflect the modules. (probably in css)
// * stop the timer if they finish the quiz in time.
// * fix bug that after starting over, it takes you to homepage but you cannot take the quiz again.




//write the javascript that takes the input from text box and sends it to local storage

//1.) select the html query so it is available for manipulation
// var userInitialsInput = document.querySelector("#initials-And-Score");

// // 2.) create a button with a click event
// submitScoresButton.addEventListener("click", function(event){
//   event.preventDefault();

//   //3.)  create user object from submission
//   var userInput = {
//     initials: userInitialsInput.value.trim()
    
//   };

//   // set new submission to local storage 
//   localStorage.setItem("userInput", JSON.stringify(user));
  

// });
