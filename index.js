"use strict";
window.addEventListener("load", main);

let minNum = 0;
let maxNum = 100;
let previousGuesses = [];

function main() {
    const lowerButton = document.querySelector("#lower");
    const higherButton = document.querySelector("#higher");
    const correctButton = document.querySelector("#correct");

    makeGuess(previousGuesses);

    lowerButton.addEventListener("click", lower)
    higherButton.addEventListener("click", higher)
    correctButton.addEventListener("click", correct)
}

function makeGuess() {
    const guessContainer = document.querySelector("#guesses");
    const currentGuessElement = document.querySelector("#current-guess")
    const previousGuess = currentGuessElement.innerText !== "" ? Number(currentGuessElement.innerText) : null

    if (previousGuess) {
        previousGuesses.push(previousGuess)
        guessContainer.insertAdjacentHTML("beforeend", `<li class="guess">Previous guess: ${previousGuess}</li>`)
    }
    
    let newGuess = Math.ceil(Math.random() * (maxNum - minNum) + minNum); // Get random number in range between max and min
    while (previousGuesses.includes(newGuess)) {
        if (maxNum - minNum < 2) break;
        newGuess = Math.ceil(Math.random() * (maxNum - minNum) + minNum);
    }
    console.log(newGuess);
    

    currentGuessElement.innerText = newGuess;
    return newGuess;
}

function higher() {
    const currentGuessElement = document.querySelector("#current-guess")
    const currentGuess = Number(currentGuessElement.innerText);
    minNum = currentGuess;
    makeGuess();
}

function lower() {
    const currentGuessElement = document.querySelector("#current-guess")
    const currentGuess = Number(currentGuessElement.innerText);
    maxNum = currentGuess;
    makeGuess();
}

function correct() {
    const guessContainer = document.querySelector("#guesses");
    const currentGuessElement = document.querySelector("#current-guess")
    
    minNum = 0;
    maxNum = 100;
    previousGuesses = [];

    guessContainer.innerHTML = ""
    currentGuessElement.innerText = ""
    makeGuess();
}