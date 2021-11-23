import './style.css'

import { startTimer, stopTimer, resetTimer } from "./stopwatch";

const cards = new Set();

const counterEl = document.getElementById("moves__counter");
const endScreenEl = document.getElementById("popup");
const timerEl = document.getElementById("display");
const playAgainEl = document.getElementById("playAgain");
const resetGameEl = document.getElementById("resetGame");
const cardsElements = document.querySelectorAll(".memoryGame__card");

let moveCount = 0;
let points = 0;

function startGame() {
  startTimer((time) => {
    timerEl.innerText = time;
  });
}

function endGame() {
  stopTimer();

  endScreenEl.classList.add("show");

  document.getElementById("finalMove").innerText = moveCount;
  document.getElementById("totalTime").innerText = timerEl.innerText;
}

function coverCards() {
  const [firstCard, secondCard] = [...cards];
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");
}

function disableCards() {
  const [firstCard, secondCard] = [...cards];
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function checkIfMatch() {
  const [firstCard, secondCard] = [...cards];
  return firstCard.dataset.company === secondCard.dataset.company;
}

function moveCounter() {
  moveCount++;
  counterEl.innerHTML = moveCount;
}

function flipCard() {
  if (moveCount === 0) startGame();
  if (cards.has(this)) return;

  if (cards.size === 2) {
    coverCards();
    cards.clear();
  }

  cards.add(this);
  this.classList.add("flip");

  moveCounter();

  if (cards.size < 2) return;

  if (!checkIfMatch()) return;

  disableCards();
  cards.clear();
  points++;

  if (points === 1) endGame();
}

function resetGame() {
  moveCount = 0;

  points = 0;

  resetTimer();

  endScreenEl.classList.remove("show");

  cardsElements.forEach((cardEl) => cardEl.classList.remove("flip"));

  initGame();
}

function initGame() {
  cardsElements.forEach((cardEl) => cardEl.addEventListener("click", flipCard));

  cardsElements.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
}

initGame();

playAgainEl.addEventListener("click", resetGame);
resetGameEl.addEventListener("click", resetGame);
