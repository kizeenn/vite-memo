import { createStopwatch } from "../utils/stopwatch";
import { createValue } from "@vzn/reactivity";

export interface Card {
  name: string;
  isVisible: () => boolean;
  setVisibility: (value: boolean) => void;
}

export interface MemoGame {
  initCardStack: () => void;
  resetGame: () => void;
  chooseCard: (card: Card) => void;
  getMoveCount: () => number;
  getCardStack: () => Set<Card>;
  isEndGame: () => boolean;
  getTime: () => string;
}

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

function shuffleArray(array: Array<any>): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(name: string): Card {
  const [isVisible, setVisibility] = createValue(false);

  return {
    name,
    isVisible,
    setVisibility,
  } as const;
}

export function createMemoGame(): MemoGame {
  const selectedCards = new Set<Card>();
  const stopwatch = createStopwatch();
  const [getCardStack, setCardStack] = createValue<Set<Card>>(new Set());
  const [getMoveCount, setMoveCount] = createValue(0);
  const [isEndGame, setEndGame] = createValue(false);

  let points = 0;

  function initCardStack() {
    const cards: Array<Card> = [];

    companies.forEach((company) => {
      cards.push(createCard(company));
      cards.push(createCard(company));
    });

    shuffleArray(cards);

    const cardStack = new Set<Card>();

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

  function chooseCard(card: Card) {
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
  } as const;
}
