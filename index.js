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

  lowerButton.addEventListener("click", lower);
  higherButton.addEventListener("click", higher);
  correctButton.addEventListener("click", correct);
}

function makeGuess() {
  if (minNum > maxNum) {
    return;
  }

  // Get number halfway between max and min
  let newGuess = Math.floor((maxNum + minNum) / 2);

  const guessContainer = document.querySelector("#guesses");
  const currentGuessElement = document.querySelector("#current-guess");

  const previousGuess =
    currentGuessElement.innerText !== ""
      ? Number(currentGuessElement.innerText)
      : null;

  if (previousGuess && previousGuess !== newGuess) {
    previousGuesses.push(previousGuess);
    guessContainer.insertAdjacentHTML(
      "beforeend",
      `<li class="guess">Previous guess: ${previousGuess} ${
        previousGuess < newGuess ? "⬆️" : "⬇️"
      }</li>`
    );
  }

  currentGuessElement.innerText = newGuess;
  return newGuess;
}

function higher() {
  const currentGuessElement = document.querySelector("#current-guess");
  const currentGuess = Number(currentGuessElement.innerText);
  minNum = currentGuess + 1;
  makeGuess();
}

function lower() {
  const currentGuessElement = document.querySelector("#current-guess");
  const currentGuess = Number(currentGuessElement.innerText);
  maxNum = currentGuess - 1;
  makeGuess();
}

function correct() {
  const guessContainer = document.querySelector("#guesses");
  const restartButton = document.querySelector("#restart");
  const lowerButton = document.querySelector("#lower");
  const higherButton = document.querySelector("#higher");
  const correctButton = document.querySelector("#correct");
  const guesses = previousGuesses.length + 1;

  guessContainer.innerText = `I got it in ${
    guesses === 1 ? "1 guess" : `${guesses} guesses`
  }. ${getCelebrationText()}`;

  restartButton.addEventListener("click", restart);
  restartButton.style.display = "block";
  lowerButton.style.display = "none";
  higherButton.style.display = "none";
  correctButton.style.display = "none";
}

function getCelebrationText() {
  switch (previousGuesses.length) {
    case 0:
      return "I'm a genius!";
    case 1:
    case 2:
    case 3:
      return "I'm pretty good at this!";
    case 4:
    case 5:
      return "Meh.";
    default:
      return "I'm not very good at this.";
  }
}

function restart() {
  const restartButton = document.querySelector("#restart");
  restartButton.removeEventListener("click", restart);
  const guessContainer = document.querySelector("#guesses");
  const currentGuessElement = document.querySelector("#current-guess");
  const lowerButton = document.querySelector("#lower");
  const higherButton = document.querySelector("#higher");
  const correctButton = document.querySelector("#correct");

  restartButton.style.display = "none";
  lowerButton.style.display = "block";
  higherButton.style.display = "block";
  correctButton.style.display = "block";

  minNum = 0;
  maxNum = 100;
  previousGuesses = [];

  guessContainer.innerHTML = "";
  currentGuessElement.innerText = "";
  makeGuess();
}
