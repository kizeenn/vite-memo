import { createMemoGame } from "../../src/games/memo";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Games | Memo", () => {
  test("chooses card", () => {
    const game = createMemoGame();
    game.initCardStack();
    const card = [...game.getCardStack()][0];

    expect(card.isVisible()).toBe(false);

    game.chooseCard(card);

    expect(card.isVisible()).toBe(true);
  });

  test("resets game", () => {
    const game = createMemoGame();

    game.initCardStack();

    const arr1 = [...game.getCardStack()];

    expect(game.isEndGame()).toBe(false);
    expect(game.getPoints()).toBe(0);
    expect(game.getMoveCount()).toBe(0);

    do {
      for (let i = 0; i < arr1.length; i++) {
        let firstCard = [...game.getCardStack()][i];

        for (let j = 0; j < arr1.length; j++) {
          let secondCard = [...game.getCardStack()][j];

          game.chooseCard(firstCard);
          game.chooseCard(secondCard);

          if (firstCard.name === secondCard.name) {
            arr1.splice(i, 0);
            arr1.splice(j, 0);
          }
        }
      }
    } while (arr1.length === 0);

    expect(game.isEndGame()).toBe(true);
    expect(game.getPoints()).not.toBe(0);
    expect(game.getMoveCount()).not.toBe(0);

    game.resetGame();

    expect(game.isEndGame()).toBe(false);
    expect(game.getPoints()).toBe(0);
    expect(game.getMoveCount()).toBe(0);
  });

  test("returns moves", () => {
    const game = createMemoGame();
    game.initCardStack();
    const card = [...game.getCardStack()][0];

    expect(game.getMoveCount()).toBe(0);

    game.chooseCard(card);

    expect(game.getMoveCount()).toBe(1);
  });

  test("returns points", () => {
    const game = createMemoGame();

    game.initCardStack();

    const arr1 = [...game.getCardStack()];

    expect(game.isEndGame()).toBe(false);
    expect(game.getPoints()).toBe(0);

    do {
      for (let i = 0; i < arr1.length; i++) {
        let firstCard = [...game.getCardStack()][i];

        for (let j = 0; j < arr1.length; j++) {
          let secondCard = [...game.getCardStack()][j];

          game.chooseCard(firstCard);
          game.chooseCard(secondCard);

          if (firstCard.name === secondCard.name) {
            arr1.splice(i, 0);
            arr1.splice(j, 0);
          }
        }
      }
    } while (arr1.length === 0);

    expect(game.getPoints()).not.toBe(0);
  });

  test("inits card stack", () => {
    const game = createMemoGame();

    expect([...game.getCardStack()]).toHaveLength(0);

    game.initCardStack();

    expect([...game.getCardStack()]).toHaveLength(16);
  });

  test("choose card if end game", () => {
    const game = createMemoGame();

    game.initCardStack();

    const arr1 = [...game.getCardStack()];

    expect(game.isEndGame()).toBe(false);
    expect(game.getPoints()).toBe(0);

    do {
      for (let i = 0; i < arr1.length; i++) {
        let firstCard = [...game.getCardStack()][i];

        for (let j = 0; j < arr1.length; j++) {
          let secondCard = [...game.getCardStack()][j];

          game.chooseCard(firstCard);
          game.chooseCard(secondCard);

          if (firstCard.name === secondCard.name) {
            arr1.splice(i, 0);
            arr1.splice(j, 0);
          }
        }
      }
    } while (arr1.length === 0);

    expect(game.getPoints()).toBe(8);

    expect(game.isEndGame()).toBe(true);
  });

  test("stopwatch starts", async () => {
    const game = createMemoGame();

    game.initCardStack();

    const card = [...game.getCardStack()][0];

    expect(game.getTime()).toBe("00:00:00");

    await wait(100);

    expect(game.getTime()).toBe("00:00:00");
    expect(game.getMoveCount()).toBe(0);

    game.chooseCard(card);

    await wait(100);

    expect(game.getMoveCount()).toBe(1);
    expect(game.getTime()).not.toBe("00:00:00");
  });

  test("can't pick the same card twice", () => {
    const game = createMemoGame();

    game.initCardStack();

    const card = [...game.getCardStack()][0];

    expect(game.getMoveCount()).toBe(0);

    game.chooseCard(card);

    expect(game.getMoveCount()).toBe(1);

    game.chooseCard(card);

    expect(game.getMoveCount()).toBe(1);
  });

  test("cover selected cards", () => {
    const game = createMemoGame();

    game.initCardStack();

    const firstCard = [...game.getCardStack()][0];
    const secondCard = [...game.getCardStack()][1];
    const thirdCard = [...game.getCardStack()][2];

    expect(firstCard.isVisible()).toBe(false);
    expect(secondCard.isVisible()).toBe(false);
    expect(thirdCard.isVisible()).toBe(false);

    game.chooseCard(firstCard);

    expect(firstCard.isVisible()).toBe(true);
    expect(secondCard.isVisible()).toBe(false);
    expect(thirdCard.isVisible()).toBe(false);

    game.chooseCard(secondCard);

    expect(firstCard.isVisible()).toBe(true);
    expect(secondCard.isVisible()).toBe(true);
    expect(thirdCard.isVisible()).toBe(false);

    game.chooseCard(thirdCard);

    expect(firstCard.isVisible()).toBe(false);
    expect(secondCard.isVisible()).toBe(false);
    expect(thirdCard.isVisible()).toBe(true);
  });

  test("move count increments", () => {
    const game = createMemoGame();

    game.initCardStack();

    const firstCard = [...game.getCardStack()][0];
    const secondCard = [...game.getCardStack()][1];

    expect(game.getMoveCount()).toBe(0);

    game.chooseCard(firstCard);

    expect(game.getMoveCount()).toBe(1);

    game.chooseCard(secondCard);

    expect(game.getMoveCount()).toBe(2);
  });
});
