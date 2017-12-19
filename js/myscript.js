//correctAnswer= number of place in array (exmp, 0) + 1 (exmp,0 +1 =1) add the word 'option' before (exmp, 'option'+1= 'option1')
var questions = [{
    question: "What is the population of Brazil?",
    choices: ["145 million", "199 million", "182 million"],
    correctAnswer: 'option2'
}, {
    question: "What is 27*14?",
    choices: ["485", "634", "408"],
    correctAnswer: 'option3'
}, {
    question: "What is the busiest train station in the world?",
    choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine"],
    correctAnswer: 'option2'
}, {
    question: "What is the longest river?",
    choices: ["Nile", "Amazon", "Mississippi"],
    correctAnswer: 'option1'
}, {
    question: "What is the busiest tube station in the London?",
    choices: ["Waterloo", "Baker Street", "Kings Cross"],
    correctAnswer: 'option1'
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".next-button").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
              //No answer selected
              $(document).find(".next-button").addClass('n-a');
              //$('#element').tooltip('show')
                //$(document).find(".quizMessage").text("Please select an answer");
                //$(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                //$(document).find(".quizMessage").hide();
                $(document).find(".next-button").removeClass('n-a');
                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                    console.log(correctAnswers);
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                    $(document).find(".page").text((currentQuestion+1)+'/'+questions.length);
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".next-button").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".next-button").text("Next");
            resetQuiz();
            displayCurrentQuestion();
            $(document).find(".page").text('1/'+questions.length);
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {
    //console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find("h2.question");
    //var choiceList = $(document).find(".choice-1");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);


    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        var selectorInput="input[value=option"+(i+1)+']';
        $(document).find(selectorInput).closest('label').children('p').text(choice);
    }
    //uncheck all choices
    clearForm();
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".modal-body").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $('#myModal').modal('show');
}

function hideScore() {
  $('#myModal').modal('hide');
}
function clearForm(){
  $('input[type="radio"]').prop( "checked", false );
 }
