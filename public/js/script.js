 //======================//
// Constants            //
//======================//

/** Maximum number of tries */
const MAX_TRIES = 7;
/** Array of words to guess */
const WORDS = [
    "SOCIAL DISTANCE",
    "PANDEMIC",
    "VIRUS",
    "QUARANTINE",
    "ASYMPTOMATIC",
    "SCREENING",
    "FACE MASK",
    "SANITIZER",
    "SHUTDOWN",
    "REMOTE LEARNING"
];
/** Parallel array to WORDS for their definitions */
const DEFINITIONS = [
    "The avoidance of close contact with other people during the outbreak of a contagious disease in order to minimize exposure and reduce the transmission of infection",
    "An outbreak of a disease that occurs over a wide geographic area and affects an exceptionally high proportion of the population",
    "A small parasite that cannot reproduce by itself",
    "A restriction on the movement of people and goods which is intended to prevent the spread of disease or pests.",
    "Showing no evidence of disease.",
    "A process OF examining a person to see if they have a disease",
    "A protective mask covering the nose and mouth or nose and eyes",
    "A substance or product that is used to reduce or eliminate pathogenic agents (such as bacteria) on surfaces",
    "A closure of a factory or system, typically a temporary closure due to a malfunction or for maintenance.",
    "A learning experience that is enhanced through utilizing computers and/or the internet both outside and inside the facilities of the educational organization."
];
/** Letters of the alphabet */
const ALPHABET = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]
/** Sprite width */
const SPRITE_WIDTH = 60;

/** Keyboard button dimensions */
const HEIGHT = 60;
const WIDTH = 60;

//======================//
// Global Variables     //
//======================//

/** Random word for the user. */
let wordChoice = "";
/** The starting number of user mistakes. */
let mistakes = 0;
/** The number of guesses. */
let guesses = 0;
/** An array of guessed letters. */
let guessedLetters = [];
/** An array of correctly-guessed letters. */
let correctLetters = [];
/** Current sprite left position. */
let spriteCurrent = 60;
/** The user's score. */
let score = "";


//======================//
// HTML DOM Elements    //
//======================//

/** Array of DOM buttons */
let buttons = [];

//======================//
// Constructors         //
//======================//

// Button Constructor
function Button(letter) {
    this.letter = letter;
    this.isClicked = false;
    this.btn = document.createElement("button");
    this.btn.innerHTML = letter;
    this.btn.style.width = WIDTH;
    this.btn.style.height = HEIGHT;
    this.btn.setAttribute("class", "keyboardStyle");

    document.getElementById("keyboard").appendChild(this.btn);

    // click handler
    this.btn.onclick = checkLetter(this.btn, letter);
}


//======================//
// Functions            //
//======================//

/** Generates a random word from the array of words. */
function randomWord() {
    let wordHint = document.getElementById("wordHint");
    let randomWord = Math.floor(Math.random() * WORDS.length);
    
    wordChoice = WORDS[randomWord];
    wordHint.innerHTML = DEFINITIONS[randomWord];
}

function setGuessed() {
    let guessed = document.getElementById("guess");

    guessed.innerHTML = "";

    for (let i = 0; i < wordChoice.length; i++) {
        if (wordChoice.charAt(i) == " ") {
            guessed.innerHTML += "&nbsp&nbsp";
        } else {
            guessed.innerHTML += "_ ";
        }
    }
}

/** Checks whether the clicked letter exists in the word. */
function checkLetter(button, letter) {
    return function () {
        button.onclick = null;
        button.style.backgroundColor = "black";
        button.isClicked = true;
        guesses++;

        if (!wordChoice.includes(letter)) { // if letter does not exist in word
            incHangman();
            guessedLetters.push(letter);
            incMistakes();
            if (mistakes != MAX_TRIES) {
                return alert("Wrong!");
            }
        } else { // letter does exist in word
            correctLetters.push(letter);
            guessedLetters.push(letter);

            revealLetter();

            if (isGuessed(wordChoice, guessedLetters)) {
                win();
            } else {
                return alert("Correct!");
            }
        }
    }
}

/** Creates the 26 buttons for the keyboard */
function createButtons() {
    for (let i = 0; i < ALPHABET.length; i++) {
        buttons.push(new Button(ALPHABET[i]));
    }
}

/** Adds a body part to the hangman */
function incHangman() {
    let hangmanImage = document.getElementById("hangmanImage");

    spriteCurrent -= SPRITE_WIDTH;

    hangmanImage.style.background = "url(images/Spritesheet.png) " + spriteCurrent + "px 0";
}

/** Increments user mistakes by 1 and calls gameOver if tries reach 7 */
function incMistakes() {
    let mistakesText = document.getElementById("mistakes");

    mistakes++;

    mistakesText.innerHTML = mistakes + " out of 7";
    if (mistakes === MAX_TRIES) {
        gameOver();
    }
}

/** check if the word has been guessed */
function isGuessed(word, guesses) {
    word = word.replace(" ", "");

    for (let i = 0; i < word.length; i++) {
        if (!guesses.includes(word.charAt(i))) {
            return false;
        }
    }
    return true;
}

/** Reveals a letter of the random word (user guessed correct) */
function revealLetter() {
    let counter;
    let letter;
    let guessed = document.getElementById("guess");

    guessed.innerHTML = "";

    for (let i = 0; i < wordChoice.length; i++) {
        counter = 0;

        for (let j = 0; j < correctLetters.length; j++) {
            if (wordChoice.charAt(i) == correctLetters[j]) {
                letter = wordChoice.charAt(i);

                if (wordChoice.charAt(i) == " ") {
                    letter = "&nbsp";
                }

                counter++;
            }
        }
        
        if (counter > 0) {
            guessed.innerHTML += letter + " ";
        } else if (wordChoice.charAt(i) == " ") {
            guessed.innerHTML += "&nbsp&nbsp";
        } else {
            guessed.innerHTML += "_ ";
        }
    }
}

/** Ends the game and displays message to user */
function gameOver() {
    alert("GAME OVER. OUT OF TRIES.");
    alert("The word was: " + wordChoice);

    endGame();
}

/** Ends the game and displays message to user */
function win() {
    // TODO: HAGman
    alert("Congratulations! You saved HAGman!");
    alert("The word was: " + wordChoice);

    endGame();
}

/** resets the game */
function reset() {
    location.reload();
}

/** prompts user to enter name and displays score */
function endGame(){
    let playerName = prompt("What is your name?", "Amir");
    score = mistakes + " lives";
    alert(playerName + ", you lost " + score + "!");
    location.reload();
}


//======================//
// Main()               //
//======================//

createButtons();
randomWord();
setGuessed();