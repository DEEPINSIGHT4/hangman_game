var wordsList = ["germany", "nepal", "asutralia", "newzealand", "poland", "africa",
  "america", "china", "india", "brazil", "russia", "austria"];

var chosenWord = "";
var lettersInChosenWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongGuesses = [];
var letterGuessed = "";
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;



function startGame() {

  numGuesses = 9;
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  lettersInChosenWord = chosenWord.split("");
   numBlanks = lettersInChosenWord.length;
  console.log(chosenWord);
  blanksAndSuccesses = [];
  wrongGuesses = [];
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }
  
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

function checkLetters(letter) {
  // This boolean will be toggled based on whether or not
  // a user letter is found anywhere in the word.
  var letterInWord = false;
  // Check if a letter exists inside the array at all.
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      // If the letter exists then toggle this boolean to true.
      // This will be used in the next step.
      letterInWord = true;
    }
  }
  // If the letter exists somewhere in the word,
  // then figure out exactly where (which indices).
  if (letterInWord) {
    // Loop through the word
    for (var j = 0; j < numBlanks; j++) {
      // Populate the blanksAndSuccesses with every instance of the letter.
      if (chosenWord[j] === letter) {
        // Here we set specific blank spaces to equal the correct letter
        // when there is a match.
        blanksAndSuccesses[j] = letter;
      }
    }
    // Log the current blanks and successes for testing.
    console.log(blanksAndSuccesses);
  }
  // If the letter doesn't exist at all...
  else {
    // Then we add the letter to the list of wrong letters.
    wrongGuesses.push(letter);
    // We also subtract one of the guesses.
    numGuesses--;
  }
}
function roundComplete() {
  console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);
  document.getElementById("guesses-left").innerHTML = numGuesses;
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
  if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
    winCounter++;
    alert("Congratulation You win!");
    document.getElementById("win-counter").innerHTML = winCounter;
    startGame();
  }
  else if (numGuesses === 0) {
    lossCounter++;
    alert("You lose");
    document.getElementById("loss-counter").innerHTML = lossCounter;
    startGame();
  }
}
startGame();
document.onkeyup = function(event) {
  letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
};