import { startTimer, stopTimer, resetTimer } from "./stopwatch";

const companies = [
  "netflix",
  "apple",
  "amazon",
  "kfc",
  "spotify",
  "starbucks",
  "tesla",
  "vscode",
];

const selectedCards = new Map();
const cardStack = new Set();

export let moveCount = 0;
export let stopwatch = '00:00:00';
let points = 0;
let onTimeChange = () => {};
let onCounterChange = () => {};
let onEndGame = () => {};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function setOnTimeChange(callback) {
  onTimeChange = callback;
}

export function setOnCounterChange(callback) {
  onCounterChange = callback
}

export function setOnEndGame(callback) {
  onEndGame = callback
}

function endGame() {
  stopTimer();
  onEndGame();
}

function checkIfMatch() {
  const [firstCard, secondCard] = [...selectedCards.keys()];
  return firstCard.name === secondCard.name;
}

function moveCounter() {
  onCounterChange(++moveCount)
}

export function chooseCard(card, onFlip, onCover) {
  if (moveCount === 0) startTimer((time) => {
    stopwatch = time;
    onTimeChange(time);
  });

  if (selectedCards.has(card)) return;

  if (selectedCards.size === 2) {
    [...selectedCards.values()].forEach((fn) => fn());
    selectedCards.clear();
  }

  selectedCards.set(card, onCover);

  moveCounter();
  onFlip();

  if (selectedCards.size < 2) return;

  if (!checkIfMatch()) return;

  selectedCards.clear();
  points++;

  if (points === 1) endGame();
}

function resetGame() {
  moveCount = 0;

  points = 0;

  resetTimer();

  [...selectedCards.values()].forEach((fn) => fn());

  initGame();
}

export function initGame() {
  const cards = [];

  cardStack.clear();

  companies.forEach((company) => {
    cards.push({ name: company });
    cards.push({ name: company });
  });

  shuffleArray(cards);

  cards.forEach((card) => cardStack.add(card));

  return cardStack;
}

// playAgainEl.addEventListener("click", resetGame);
// resetGameEl.addEventListener("click", resetGame);
