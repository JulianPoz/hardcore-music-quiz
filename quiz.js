document.addEventListener("DOMContentLoaded", function(event) { 

	if (localStorage.getItem("username") === null) {
	var overlayDiv = document.getElementById("overlay");
	overlayDiv.className +="overlayHidden";
	}
});
var whichButtonClick=""; //String holding either "back" or "next"
var correctAnswerFinalTotal=0 // initalize a variable that will be used by the displayQuizResults function to calculate the final quiz score
var questionCounterVariable=0; // initialize a variable that counts questions shown
var questionAndAnswer=[ // Object holding answers selected by the user
	{
	questionNumber:1,
	questionAnswer:"unanswered",
	selectedAnswerIndex:null
	},
	{
	questionNumber:2,
	questionAnswer:"unanswered",
	selectedAnswerIndex:null
	},
	{
	questionNumber:3,
	questionAnswer:"unanswered",
	selectedAnswerIndex:null
	},
	{
	questionNumber:4,
	questionAnswer:"unanswered",
	selectedAnswerIndex:null
	}
]; 

//Object holding all questions and answers
var allQuizQuestions = [
	{
	question: "What hardcore band was Ian MacKaye in?", 
	choices: ["Fuck Ups", "Minor Threat", "Big Boys", "Agnostic Front"], 
	correctAnswer:1
	},
	{
	question: "What city were the Big Boys from?", 
	choices: ["Houston", "New York", "Austin", "New York"], 
	correctAnswer:2
	},
	
	{
	question: "DRI were from what city?", 
	choices: ["Houston", "Austin", "Tuskeegee", "Paris"], 
	correctAnswer:0
	},
	{
	question: "'HR' stands for _____",
	choices: ["Human Rights", "Hairy Rebel", "Hate Read", "Hailie Rufus"],
	correctAnswer:0
	}
];

//storing allQuestions object in a JSON object
var json = JSON.stringify(allQuizQuestions);
// parsing JSON object back into a JS object to use 
var allQuestions=JSON.parse(json);

window.onload=displayQuestion(); //runs function to display the first question on window.onload

function displayQuestion() {
		for(var d = 0; d<document.forms.length; d++) { //finds all forms in document
		     var b=document.forms[d];
		     if (allQuestions[questionCounterVariable]) { // makes sure you haven't run out of questions
			     var dynamicQuestion = allQuestions[questionCounterVariable].question; // outputs current question
			     var firstQuizQuestion = b.firstElementChild;
			     firstQuizQuestion.innerHTML = dynamicQuestion;
	 		}
		     for(var a=0; a<b.elements.length; a++) { // loops through elements in our form
		         var c = b.elements[a];
		             if (c.type=="radio" && allQuestions[questionCounterVariable]) { // adds choices to form and checks you haven't run out of questions
		                 var label = c.nextElementSibling;
		                 var labelText=allQuestions[questionCounterVariable].choices[a];
		                 label.innerHTML = labelText; // outputs current answer choices
		                 if (questionAndAnswer[questionCounterVariable].selectedAnswerIndex==a) {// makes sure the selected radio button matches the user's selection
		                 	c.checked=true;
		                 } else if (questionAndAnswer[questionCounterVariable].selectedAnswerIndex==null) {
		                 	for(i=0; i<quiz.elements.length; i++) { 
							 	if(quiz.elements[i].checked) {
							 		for(i=0; i<quiz.elements.length; i++) { // uncheck all radio buttons
							 		quiz.elements[i].checked=false; 
							 		}
							 	}
							}
		                 }
		             }
		     }
		}
	if (allQuestions[questionCounterVariable]==undefined) {
		displayQuizResults ();
	}
}


function checkAnswer () { 
	
	if(questionCounterVariable<allQuestions.length) {
		for (var g=0; g<document.forms.length; g++){ //finds all forms in document
			var h = document.forms[g];
				for (var i=0; i<h.elements.length; i++) { // loops through elements in our form and sees what's checked
					var j=h.elements[i];
					if (j.checked==true) {
						questionAndAnswer[questionCounterVariable].selectedAnswerIndex=i;//change selected index property so quiz remembers what answer was chosen
						var answer=i;
						 var rightAnswer=allQuestions[questionCounterVariable].correctAnswer
						 	if(answer==allQuestions[questionCounterVariable].correctAnswer) { // checks if the answer checked by user is the correct answer to the question on the quiz
						 		console.log("Correct! You chose " + answer + ", and the correct answer is " + rightAnswer);
						 		questionAndAnswer[questionCounterVariable].questionAnswer="correct";// changes question number property in questionAnswerArray to 1, or answered
						 		if (whichButtonClick=="next") { // if next button is clicked
						 			advanceToNextQuestion();
						 			return questionCounterVariable;
						 			
						 		} else if (whichButtonClick=="back"){ // if back button is clicked
						 			if (questionCounterVariable==0) { // if user is on question 1, you can't go backwards, so prevent this function from executing
											return false;
									}
									questionCounterVariable=questionCounterVariable-1; //subtract 1 from question counter variable
									displayQuestion();
									return questionCounterVariable;
						 		}

							} else {
								console.log("Incorrect! You chose " + answer + ", but the correct answer is " + rightAnswer);	
								questionAndAnswer[questionCounterVariable].questionAnswer="incorrect";// changes question number property in questionAnswerArray to 1, or answered
								if (whichButtonClick=="next") { // if next button is clicked
						 			advanceToNextQuestion();
						 			return questionCounterVariable;
						 			
						 		} else if (whichButtonClick=="back"){ // if back button is clicked
						 			if (questionCounterVariable==0) { // if user is on question 1, you can't go backwards, so prevent this function from executing
										return false;
									}
									questionCounterVariable=questionCounterVariable-1; //subtract 1 from question counter variable
									displayQuestion();
									return questionCounterVariable;
						 			
						 		}
						 	}
					}  
				}
		}
	}
}

function advanceToNextQuestion () {
	questionCounterVariable=questionCounterVariable+1; // adds 1 to question counter 
	console.log("You are now on question number " + (questionCounterVariable + 1));
	displayQuestion(); // executes function to advance to the next question in  the quiz
	return questionCounterVariable;
}

function displayQuizResults () {
	document.quiz.style.display="none";
	var buttons = document.getElementsByTagName("button");
	buttons[0].style.display="none";
	for(counter=0; counter<questionAndAnswer.length; counter++) { //loop through questionAndAnswer object 
		if (questionAndAnswer[counter].questionAnswer=="correct") {
			correctAnswerFinalTotal=correctAnswerFinalTotal + 1; // add 1 to correctAnswerFinalTotal for each correct answer (i.e. questionAnswer="correct") in questionAndAnswer object
		}
	}
	var quizResult = "You got " + correctAnswerFinalTotal + "  correct questions."; // output final quiz results to quizContainer div
	document.getElementById("quizContainer").innerHTML = quizResult;
}

function formValidation() {
	for (i=0; i<quiz.elements.length; i++) {  // check through buttons to find if there's a checked button
		if (quiz.elements[i].checked) {  // if no answers are checked
		return true;
		} 
	} 
	alert("Please make a choice");
}

//jquery event listeners for next and back buttons, to fade in/out and go to next/last question
$( "#next" ).click(function(evt) { 
	whichButtonClick = (this.id); // checks which button has been clicked and stores it in a variable
	console.log(whichButtonClick);
	
	var answeredQuestion = formValidation();
	if(answeredQuestion == true) {
		  $('#quizContainer').animate({'opacity': 0}, 1000, function () {
		  checkAnswer() }).animate({'opacity': 1}, 1000);
	}
	return whichButtonClick;
});


$( "#back" ).click(function(evt) {
	whichButtonClick = (this.id); // checks which button has been clicked and stores it in a variable
	console.log(whichButtonClick);

	var answeredQuestion = formValidation();;
	if(answeredQuestion == true) {
	   $('#quizContainer').animate({'opacity': 0}, 1000, function () {
	   checkAnswer() }).animate({'opacity': 1}, 1000);
	}	
	return whichButtonClick;
});




// login modal 
document.addEventListener("DOMContentLoaded", function () { // waits until content is loaded
if (localStorage.getItem("username") ) { // checks if there's a username property in local storage
	var overlayDiv = document.body.getElementsByTagName("div"); // grabs a reference to the overlay div
	document.body.removeChild(overlayDiv[2]); // removes overlay div from dom
	var username=localStorage.username;
	window.onload = function(){
    alert("Welcome back, " + username);
	};
} else {
	document.getElementById("submit").addEventListener("click", function () { //
	var loginUserName=document.forms.login.elements[0].value;  // grabs reference to the username typed in by the user
	var loginUserEmail=document.forms.login.elements[1].value; // grabs reference to the email typed in by the user
	localStorage.setItem("username", loginUserName); // saves username to local storage
	localStorage.setItem("email", loginUserEmail);  // saves email to local storage
	var overlayDiv = document.body.getElementsByTagName("div"); // grabs a reference to the overlay div
	document.body.removeChild(overlayDiv[2]); // removes overlay div from dom
	});

}
});



