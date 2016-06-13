$.getJSON("quizQuestions.json", function(data) {}); // pulls in quiz questions from another pen

document.addEventListener("DOMContentLoaded", function(event) {

  if (localStorage.getItem("username") === null) {
    var overlayDiv = document.getElementById("overlay");
    overlayDiv.className += "overlayHidden";
  }
});
var whichButtonClick = ""; //String holding either "back" or "next"
var correctAnswerFinalTotal = 0 // initalize a variable that will be used by the displayQuizResults function to calculate the final quiz score
var questionCounterVariable = 0; // initialize a variable that counts questions shown
var clickedTab = "One";

window.onload = displayQuestion(); //runs function to display the first question on window.onload

function displayQuestion() {
  if (clickedTab == "One") {
    currentQuiz = allQuizQuestionsOne;
    questionAndAnswer = questionAndAnswerOne;
  } else if (clickedTab == "Two") {
    currentQuiz = allQuizQuestionsTwo;
    questionAndAnswer = questionAndAnswerTwo;
  } else if (clickedTab == "Three") {
    currentQuiz = allQuizQuestionsThree;
    questionAndAnswer = questionAndAnswerThree;
  } else if (clickedTab == "Four") {
    currentQuiz = allQuizQuestionsFour;
    questionAndAnswer = questionAndAnswerFour;
  }
  //storing allQuestions object in a JSON object
  currentQuiz = JSON.stringify(currentQuiz);
  // parsing JSON object back into a JS object to use 
  var allQuestions = JSON.parse(currentQuiz);
  for (var d = 0; d < document.forms.length; d++) { //finds all forms in document
    var b = document.forms[d];
    if (allQuestions[questionCounterVariable]) { // makes sure you haven't run out of questions
      var dynamicQuestion = allQuestions[questionCounterVariable].question; // outputs current question
      var firstQuizQuestion = b.firstElementChild;
      firstQuizQuestion.innerHTML = dynamicQuestion;
    }
    for (var a = 0; a < b.elements.length; a++) { // loops through elements in our form
      var c = b.elements[a];
      if (c.type == "radio" && allQuestions[questionCounterVariable]) { // adds radio button choices to form and checks you haven't run out of questions
        var label = c.nextElementSibling;
        var labelText = allQuestions[questionCounterVariable].choices[a];
        label.innerHTML = labelText; // outputs current answer choices				
        if (questionAndAnswer[questionCounterVariable].selectedAnswerIndex == a) { // makes sure the selected radio button matches the user's selection
          c.checked = true;
        } else if (questionAndAnswer[questionCounterVariable].selectedAnswerIndex == null) {
          for (i = 0; i < quiz.elements.length; i++) {
            if (quiz.elements[i].checked) {
              for (i = 0; i < quiz.elements.length; i++) { // uncheck all radio buttons
                quiz.elements[i].checked = false;
              }
            }
          }
        }
      }
    }
  }
  if (allQuestions[questionCounterVariable] == undefined) {
    displayQuizResults();
  }
  return allQuestions;
}

function checkAnswer() {
  if (clickedTab === "One") {
    currentQuiz = allQuizQuestionsOne;
    questionAndAnswer = questionAndAnswerOne;
  } else if (clickedTab === "Two") {
    currentQuiz = allQuizQuestionsTwo;
    questionAndAnswer = questionAndAnswerTwo;
  } else if (clickedTab === "Three") {
    currentQuiz = allQuizQuestionsThree;
    questionAndAnswer = questionAndAnswerThree;
  } else if (clickedTab === "Four") {
    currentQuiz = allQuizQuestionsFour;
    questionAndAnswer = questionAndAnswerFour;
  }
  //storing allQuestions object in a JSON object
  currentQuiz = JSON.stringify(currentQuiz);
  // parsing JSON object back into a JS object to use 
  var allQuestions = JSON.parse(currentQuiz);
  if (questionCounterVariable < allQuestions.length) {
    for (var g = 0; g < document.forms.length; g++) { //finds all forms in document
      var h = document.forms[g];
      for (var i = 0; i < h.elements.length; i++) { // loops through elements in our form and sees what's checked
        var j = h.elements[i];
        if (j.checked == true) {
          questionAndAnswer[questionCounterVariable].selectedAnswerIndex = i; //change selected index property so quiz remembers what answer was chosen
          var answer = i;
          // allQuestionsObject=JSON.parse(allQuestions);
          // console.log("allQuestionsObject is" + allQuestionsObject);
          var rightAnswer = allQuestions[questionCounterVariable].correctAnswer;

          if (answer == allQuestions[questionCounterVariable].correctAnswer) { // checks if the answer checked by user is the correct answer to the question on the quiz
            console.log("Correct! You chose " + answer + ", and the correct answer is " + rightAnswer);
            questionAndAnswer[questionCounterVariable].questionAnswer = "correct"; // changes question number property in questionAnswerArray to 1, or answered
            if (whichButtonClick == "next") { // if next button is clicked
              advanceToNextQuestion();
              return questionCounterVariable;

            } else if (whichButtonClick == "back") { // if back button is clicked
              if (questionCounterVariable == 0) { // if user is on question 1, you can't go backwards, so prevent this function from executing
                return false;
              }
              questionCounterVariable = questionCounterVariable - 1; //subtract 1 from question counter variable
              displayQuestion();
              return questionCounterVariable;
            }

          } else {
            console.log("Incorrect! You chose " + answer + ", but the correct answer is " + rightAnswer);
            questionAndAnswer[questionCounterVariable].questionAnswer = "incorrect"; // changes question number property in questionAnswerArray to 1, or answered
            if (whichButtonClick == "next") { // if next button is clicked
              advanceToNextQuestion();
              return questionCounterVariable;

            } else if (whichButtonClick == "back") { // if back button is clicked
              if (questionCounterVariable == 0) { // if user is on question 1, you can't go backwards, so prevent this function from executing
                return false;
              }
              questionCounterVariable = questionCounterVariable - 1; //subtract 1 from question counter variable
              displayQuestion();
              return questionCounterVariable;

            }
          }
        }
      }
    }
  }
}

function advanceToNextQuestion() {
  questionCounterVariable = questionCounterVariable + 1; // adds 1 to question counter 
  console.log("You are now on question number " + (questionCounterVariable + 1));
  displayQuestion(); // executes function to advance to the next question in  the quiz
  return questionCounterVariable;
}

function displayQuizResults() {

  for (counter = 0; counter < questionAndAnswer.length; counter++) { //loop through questionAndAnswer object 
    if (questionAndAnswer[counter].questionAnswer == "correct") {
      correctAnswerFinalTotal = correctAnswerFinalTotal + 1; // add 1 to correctAnswerFinalTotal for each correct answer (i.e. questionAnswer="correct") in questionAndAnswer object
    }
  }
  var quizResult = "You got " + correctAnswerFinalTotal + "  correct questions."; // output final quiz results to quizContainer div
  document.getElementById("resultContainer").innerHTML = quizResult;
}

function formValidation() {
  for (i = 0; i < quiz.elements.length; i++) { // check through buttons to find if there's a checked button
    if (quiz.elements[i].checked) { // if no answers are checked
      return true;
    }
  }
  alert("Please make a choice");
}

//jquery event listeners for next and back buttons, to fade in/out and go to next/last question
$("#next").click(function(evt) {
  whichButtonClick = (this.id); // checks which button has been clicked and stores it in a variable
  var answeredQuestion = formValidation();
  if (answeredQuestion == true) {
    $('#quizContainer').animate({
      'opacity': 0
    }, 1000, function() {
      checkAnswer()
    }).animate({
      'opacity': 1
    }, 1000);
  }
  return whichButtonClick;
});

$("#back").click(function(evt) {
  whichButtonClick = (this.id); // checks which button has been clicked and stores it in a variable
  var answeredQuestion = formValidation();;
  if (answeredQuestion == true) {
    $('#quizContainer').animate({
      'opacity': 0
    }, 1000, function() {
      checkAnswer()
    }).animate({
      'opacity': 1
    }, 1000);
  }
  return whichButtonClick;
});

//event listeners for quizzes, so users can choose their quiz
var anchors = document.getElementsByTagName("a"); // loops through anchors and adds click event handler
for (i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', goToQuiz);
}

//function that, when passed the mouseevent from the tabbed quizzes, figures out which tab was clicked
function goToQuiz(e) {
  document.getElementById("resultContainer").innerHTML = ""; //clears score from quiz container div
  whichButtonClick = ""; //String holding either "back" or "next"
  correctAnswerFinalTotal = 0 // initalize a variable that will be used by the displayQuizResults function to calculate the final quiz score
  questionCounterVariable = 0; // initialize a variable that counts questions shown
  var clickedAnchor = e.target; // gets the event's target (which is an anchor tag)
  if (clickedAnchor.text == "Quiz 1") { // returns clickedTab for use in the displayQuestion function to choose which quiz to show and what set of answers to use
    clickedTab = "One"; // 
    displayQuestion();
    return clickedTab;
  }
  if (clickedAnchor.text == "Quiz 2") { // 
    clickedTab = "Two";
    displayQuestion();
    return clickedTab;
  }
  if (clickedAnchor.text == "Quiz 3") { // 
    clickedTab = "Three";
    console.log("Three");
    displayQuestion();
    return clickedTab;
  }
  if (clickedAnchor.text == "Quiz 4") { // 
    clickedTab = "Four";
    displayQuestion();
    return clickedTab;
  }

}

function setQuizQuestionsAndQuestions() { // function that is used in displayAnswer and checkAnswer to know what question they are dealing with 
  if (clickedTab == "Two") {
    currentQuiz = allQuizQuestionsTwo;
    questionAndAnswer = questionAndAnswerTwo;
  } else if (clickedTab == "One") {
    currentQuiz = allQuizQuestionsOne;
    questionAndAnswer = questionAndAnswerOne;
  }
  //storing allQuestions object in a JSON object
  currentQuiz = JSON.stringify(currentQuiz);
  // parsing JSON object back into a JS object to use 
  var allQuestions = JSON.parse(currentQuiz);
}

// login modal 
document.addEventListener("DOMContentLoaded", function() { // waits until content is loaded
  if (localStorage.getItem("username")) { // checks if there's a username property in local storage
    var overlay = document.getElementById("overlay"); // grabs a reference to the overlay div
    overlay.parentElement.removeChild(overlay); // removes overlay div from dom
    var username = localStorage.username;
    window.onload = function() {
      alert("Welcome back, " + username);
    };
  } else {
    document.getElementById("submit").addEventListener("click", function() { //
      var loginUserName = document.forms.login.elements[0].value; // grabs reference to the username typed in by the user
      var loginUserEmail = document.forms.login.elements[1].value; // grabs reference to the email typed in by the user
      localStorage.setItem("username", loginUserName); // saves username to local storage
      var overlay = document.getElementById("overlay"); // grabs a reference to the overlay div
      overlay.parentElement.removeChild(overlay); // removes overlay div from dom
    });

  }
});
