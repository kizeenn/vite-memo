import { createStopwatch } from "../utils/stopwatch";
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(name) {
  const [isVisible, setVisibility] = createValue(false);

  return {
    name,
    isVisible,
    setVisibility,
  };
}

export function createMemoGame() {
  const selectedCards = new Set();
  const stopwatch = createStopwatch();
  const [getCardStack, setCardStack] = createValue(new Set());
  const [getMoveCount, setMoveCount] = createValue(0);
  const [isEndGame, setEndGame] = createValue(false);

  let points = 0;

  function initCardStack() {
    const cards = [];

    companies.forEach((company) => {
      cards.push(createCard(company));
      cards.push(createCard(company));
    });

    shuffleArray(cards);

    const cardStack = new Set();

    cards.forEach((card) => cardStack.add(card));

    setCardStack(cardStack);
  }

  function resetGame() {
    setMoveCount(0);

    points = 0;

    stopwatch.reset();

    setEndGame(false);

    [...selectedCards].forEach((card) => card.setVisibility(false));
    selectedCards.clear();

    initCardStack();
  }

  function chooseCard(card) {
    if (getMoveCount() === 0) stopwatch.start();

    if (selectedCards.has(card)) return;

    if (selectedCards.size === 2) {
      [...selectedCards].forEach((card) => card.setVisibility(false));
      selectedCards.clear();
    }

    selectedCards.add(card);

    setMoveCount(getMoveCount() + 1);

    card.setVisibility(true);

    if (selectedCards.size < 2) return;

    const [firstCard, secondCard] = [...selectedCards];

    if (firstCard.name !== secondCard.name) return;

    points++;

    if (points === 1) {
      stopwatch.stop();
      setEndGame(true);
      return;
    }

    selectedCards.clear();
  }

  return {
    initCardStack,
    resetGame,
    chooseCard,
    getMoveCount,
    getCardStack,
    isEndGame,
    getTime: stopwatch.getTime,
  };
}
