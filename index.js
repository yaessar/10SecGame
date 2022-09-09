$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var bestscore = 0;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#current-score').text(score);
  };

  var updateBestScore = function (score) {
    if (score > bestscore) {
      bestscore = score;
      $('#best-score').text(bestscore);
    };
  }
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateBestScore(score);
        updateScore(-score);
        $('#time-left').css('color', 'black');
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft < 4) {
          $('#time-left').css('color', 'red');
        } 
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var selectedOperators = $('.op-select:checked').map(function() {
      return $(this).data('op');
    }).toArray();
    
    var randomOperator = selectedOperators[randomNumberGenerator(Math.floor(Math.random() * selectedOperators.length))]

    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);
    
    var max = Math.max(num1, num2);
    var min = Math.min(num1, num2);

    switch (randomOperator) {
      case 'minus':
        question.answer = max - min;
        question.equation = String(max) + " - " + String(min) + " = ";
        break;
      case 'times':
        question.answer = num1 * num2;
        question.equation = String(num1) + " × " + String(num2) + " = ";
        break;
      case 'divide':
        question.answer = min;
        question.equation = String(max * min) + " ÷ " + String(max) + " = ";
        break;
      case 'add':
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2) + " = ";
      default:
    }
    
    return question;
  };
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();
});