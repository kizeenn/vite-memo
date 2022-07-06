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
  getPoints: () => number;
}

const cardNames = [
  "netflix",
  "apple",
  "google",
  "kfc",
  "spotify",
  "starbucks",
  "tesla",
  "vscode",
];

/**
 * Shuffle cards
 * ? https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {Array<any>} array
 */
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

/**
 * Create play board, allows to pick card, match them and reset game.
 *
 * @export
 * @return {*}  {MemoGame}
 */
export function createMemoGame(): MemoGame {
  const selectedCards = new Set<Card>();
  const stopwatch = createStopwatch();
  const [getCardStack, setCardStack] = createValue<Set<Card>>(new Set());
  const [getMoveCount, setMoveCount] = createValue(0);
  const [isEndGame, setEndGame] = createValue(false);
  const [getPoints, setPoints] = createValue(0);

  // initialize card stack, lets manipulate on it
  function initCardStack() {
    const cards: Array<Card> = [];

    // creates new cards with image and name
    cardNames.forEach((cardName) => {
      cards.push(createCard(cardName));
      cards.push(createCard(cardName));
    });

    // shuffle cards position
    shuffleArray(cards);

    const cardStack = new Set<Card>();

    // creating card stack from cards
    cards.forEach((card) => cardStack.add(card));

    setCardStack(cardStack);
  }

  // reset progress of current game
  function resetGame() {
    setMoveCount(0);

    setPoints(0);

    // stops stopwatch and lets run it once again
    stopwatch.reset();

    setEndGame(false);

    // cover selected cards
    selectedCards.forEach((card) => card.setVisibility(false));
    selectedCards.clear();

    // creating new card stack
    initCardStack();
  }

  // flip, match and cover cards
  function chooseCard(card: Card) {
    // prevent from choosing card after end game
    if (isEndGame()) return;

    // starts counting time when 1st card is chosen
    if (getMoveCount() === 0) stopwatch.start();

    // prevent from choosing the same card twice
    if (selectedCards.has(card)) return;

    if (selectedCards.size === 2) {
      // cover selected cards
      selectedCards.forEach((card) => card.setVisibility(false));
      selectedCards.clear();
    }

    selectedCards.add(card);

    // increment move count
    setMoveCount(getMoveCount() + 1);

    // show card content
    card.setVisibility(true);

    // skip if only one card is selected
    if (selectedCards.size < 2) return;

    const [firstCard, secondCard] = [...selectedCards];

    // cover cards if it's not match
    if (firstCard.name !== secondCard.name) return;

    // add point if it's match
    setPoints(getPoints() + 1);

    // if number of point equal number of pairs end game
    if (getPoints() === cardNames.length) {
      stopwatch.stop();
      setEndGame(true);
      return;
    }

    // allow to choose another card after match
    selectedCards.clear();
  }

  return {
    initCardStack,
    resetGame,
    chooseCard,
    getMoveCount,
    getCardStack,
    isEndGame,
    getPoints,
    getTime: stopwatch.getTime,
  } as const;
}
