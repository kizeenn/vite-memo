import { startTimer, stopTimer, resetTimer } from "./stopwatch";
import { createValue } from "@vzn/reactivity";

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

const selectedCards = new Set();
const cardStack = new Set();

let points = 0;

export const [getMoveCount, setMoveCount] = createValue(0);
export const [getStopwatch, setStopwatch] = createValue("00:00:00");
export const [isEndGame, setEndGame] = createValue(false);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function endGame() {
  stopTimer();
  setEndGame(true);
}

function checkIfMatch() {
  const [firstCard, secondCard] = [...selectedCards];
  return firstCard.name === secondCard.name;
}

export function chooseCard(card) {
  if (getMoveCount() === 0) startTimer((time) => setStopwatch(time));

  if (selectedCards.has(card)) return;

  if (selectedCards.size === 2) {
    [...selectedCards].forEach((card) => card.setVisibility(false));
    selectedCards.clear();
  }

  selectedCards.add(card);

  setMoveCount(getMoveCount() + 1);

  card.setVisibility(true);

  if (selectedCards.size < 2) return;

  if (!checkIfMatch()) return;

  points++;

  if (points === 1) return endGame();

  selectedCards.clear();
}

export function resetGame() {
  setMoveCount(0);

  points = 0;

  resetTimer();

  setEndGame(false);

  [...selectedCards].forEach((card) => card.setVisibility(false));
  selectedCards.clear();

  initGame();
}

function createCard(name) {
  const [isVisible, setVisibility] = createValue(false);

  return {
    name,
    isVisible,
    setVisibility,
  };
}

export function initGame() {
  const cards = [];

  cardStack.clear();

  companies.forEach((company) => {
    cards.push(createCard(company));
    cards.push(createCard(company));
  });

  shuffleArray(cards);

  cards.forEach((card) => cardStack.add(card));

  return cardStack;
}

// playAgainEl.addEventListener("click", resetGame);
// resetGameEl.addEventListener("click", resetGame);
