"use strict";

const DIGITS = 4;
const MAX_ATTEMPTS = 10;

const btnCheck = document.querySelector(".btn__check");
const btnClose = document.querySelector(".btn__close--window");
const btnNewGame = document.querySelector(".btn__new--game");
const messageWindow = document.querySelector(".message__window");
const overlay = document.querySelector(".overlay");
const message = document.querySelector(".message");
const attempts = document.querySelector(".attempts");
const results = document.querySelector(".results__list");
const inputGuess = document.querySelector(".guess");
const number = document.querySelector(".number");
const body = document.querySelector("body");

let secret = generateSecret();
let attemptsLeft = MAX_ATTEMPTS;
let gameOver = false;
const guessedBefore = new Set();

function generateSecret() {
  const pool = [..."0123456789"];
  let result = "";

  while (result.length < DIGITS) {
    const index = Math.floor(Math.random() * pool.length);
    result += pool.splice(index, 1)[0];
  }
  return result;
}

function countBullsAndCows(secretNumber, guess) {
  let bulls = 0;
  let cows = 0;

  for (let i = 0; i < DIGITS; i++) {
    if (guess[i] === secretNumber[i]) {
      bulls++;
    } else if (secretNumber.includes(guess[i])) {
      cows++;
    }
  }
  return { bulls, cows };
}

function validateGuess(guess) {
  if (guess.length !== DIGITS) return `⛔️ Enter exactly ${DIGITS} digits! ⛔️`;
  if (new Set(guess).size !== DIGITS) return "⛔️ Use different digits! ⛔️";
  if (guessedBefore.has(guess)) return "⛔️ You already tried this number! ⛔️";
  return "";
}

function isMessageOpen() {
  return !messageWindow.classList.contains("hidden");
}

function showMessage(text) {
  message.textContent = text;
  messageWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
  btnClose.focus();
}

function closeMessage() {
  messageWindow.classList.add("hidden");
  overlay.classList.add("hidden");
  if (!gameOver) inputGuess.focus();
}

function plural(count, word) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function renderResult(guess, bulls, cows) {
  const markup = `
<li class="result"><span class="guess__tags">${guess}</span>: ${plural(bulls, "bull")} and ${plural(cows, "cow")}</li>
`;
  results.insertAdjacentHTML("beforeend", markup);
}

function endGame(won) {
  gameOver = true;
  number.textContent = secret;
  inputGuess.disabled = true;
  btnCheck.disabled = true;

  if (won) body.classList.add("won");
  showMessage(won ? "🎉🎉 You win! 🎉🎉" : "💥💥 You lost the game! 💥💥");
}

function guessHandler() {
  if (gameOver || isMessageOpen()) return;

  const guess = inputGuess.value;
  const error = validateGuess(guess);

  if (error) {
    showMessage(error);
    return;
  }

  guessedBefore.add(guess);
  const { bulls, cows } = countBullsAndCows(secret, guess);
  renderResult(guess, bulls, cows);

  attemptsLeft--;
  attempts.textContent = attemptsLeft;
  inputGuess.value = "";

  if (bulls === DIGITS) {
    endGame(true);
  } else if (attemptsLeft === 0) {
    endGame(false);
  }
}

function resetGame() {
  secret = generateSecret();
  attemptsLeft = MAX_ATTEMPTS;
  gameOver = false;
  guessedBefore.clear();

  attempts.textContent = attemptsLeft;
  results.innerHTML = "";
  number.textContent = "?";
  body.classList.remove("won");

  inputGuess.disabled = false;
  btnCheck.disabled = false;
  inputGuess.value = "";

  closeMessage();
  inputGuess.focus();
}

// ---- Events ----
btnCheck.addEventListener("click", guessHandler);
btnNewGame.addEventListener("click", resetGame);
btnClose.addEventListener("click", closeMessage);

inputGuess.addEventListener("keydown", function (e) {
  if (e.key === "Enter") guessHandler();
});

inputGuess.addEventListener("input", function () {
  inputGuess.value = inputGuess.value.replace(/\D/g, "");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && isMessageOpen()) closeMessage();
});
