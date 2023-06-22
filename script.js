

document.getElementById('Home-Page-Button').addEventListener('click', function() {
    var card = document.getElementById('quiz-card 1');
    var otherContent = document.getElementById('Home-Page-Card');
    
    
    card.style.display = 'block';
    otherContent.style.display = 'none';
  });
  

  //how do I go from quiz card 1 to quiz card 2 and so on...
  //so each button has to take you to the next question regardless of if it is right or wrong...
