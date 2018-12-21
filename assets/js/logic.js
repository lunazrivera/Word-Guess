//Global game counters
var winCounter = 0;
var lossCounter =  0; 
var guessesLeft = 0;
// Global arrays
var wordOptions = ["loyalty", "honesty", "respect", "sensibility", "gratitude", "prudence"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];
var letterGuessed = "";
// -----------------------------------------
// Functions (reusable blocks of code that I will Call)
function startGame() {
    /* Here we are selecting a random word from the wordOptions Array 
    and splitting that word in its letters. Then we are setting the number of numBlanks equal to the chosen word length*/
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split('');
    numBlanks = lettersInWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Now we are creating a for loop to populate the blanks with the right amount of spaces.
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push('_');
    }

    // Change html to reflect game round conditions
    document.getElementById("chosen-word").textContent = blanksAndSuccesses.join(" ");
    document.getElementById("guesses-left").textContent = guessesLeft;
    document.getElementById("win-points").textContent = winCounter;
    document.getElementById("loss-points").textContent = lossCounter;
}


function checkLetters(letter) {
    // check if letter exist in code at all.
    var isLetterInWord = false;

    for (var i = 0; i < numBlanks; i++) {
        if (selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    // Check where in word letter exist, then populate
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    // letter wasnt found
    else {
        wrongLetters.push(letter);
        guessesLeft--;
    }
}

function roundComplete() {
    document.getElementById("guesses-left").textContent = guessesLeft;
    document.getElementById("chosen-word").textContent = blanksAndSuccesses.join(" ");
    document.getElementById("guessed-letters").textContent = wrongLetters.join(" ");
// check if user won
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCounter++;
        alert("You Won!");
        document.getElementById("win-points").textContent = winCounter;
        startGame();
    }
    // check if user lost
    else if (guessesLeft == 0 ) {
        lossCounter++;
        alert("You Lost");
        // Update the HTML
        document.getElementById("loss-points").textContent = lossCounter;
        startGame();
    }
    
}




// Main process
// -------------------------------------
// Initiates the code the first time.
startGame();

// Register click events
document.onkeyup = function(event){
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(userGuess);
    roundComplete();
}
// ----------------------------------------------------
