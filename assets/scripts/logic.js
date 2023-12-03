// A start button that when clicked a timer starts and the first question appears
// Questions contain buttons for every answer
// When the answer is clicked the next question appears
// If the answer clicked was incorrect then subtract time from the clock 
// The quiz should end when all questions are answered or the timer reaches 0
// When the game ends , it should display their score and give the user the ability to save their initials and their score

// index.html
// - Define the questions and the choices and the answer, put it in a variable in questions.js
// - Timer -> "number of questions" x 10 & answered incorrectly it will reduce the timer by 10
/* let count = 60; 

    const timer = setInterval(function() { 
    count--; 
    console. log(count); 
    if (count === 0) { 
    clearInterval(timer); 
    console. log("Time's up!");
}}, 1000);  */
// -> add click event listener to "start quiz" button and trigger the timer
// - Display first question -> 
//      add click event listener to "start quiz button 
//      display the first question based on the questions that we defined"
//      hide the start screen
//      show questions screen and populate it with the questions and the choices
// - Add click event listener to the choices button and check if the button is clicked
//      if the answer is correct display feedback "correct", once seen hide the feedback and move to next question
//      if incorrect subract from the timer and display feedback "incorrect"
//      check timer, 
//          if timer > 0, hide feedback then display next question
//          if timer <= 0, hide feedback and then display "end-screen"
// - Display "end-screen" and hide questions screen
// - Continue...

// highscores.html
// - Retrieve highscores from localStorage
// - Sort the scores from higher score to lower score
// - Display the highscores as a list
// * Score count is the remaining counter time
