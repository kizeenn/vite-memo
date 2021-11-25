import "./style.css";
import { createMemoGame } from "./game";
import { root, reactive, onCleanup } from "@vzn/reactivity";

const game = createMemoGame();

function PopupPlayAgainButton(): HTMLElement {
  const element = document.createElement("button");

  element.type = "button";
  element.id = "play-again";
  element.classList.add("button--play-again");
  element.innerText = "play again";
  element.addEventListener("click", game.resetGame);

  return element;
}

function PopupTime(): HTMLElement {
  const element = document.createElement("p");

  element.classList.add("popup__content__timer");
  element.innerText = `in ${game.getTime()}`;

  return element;
}

function PopupMoves(): HTMLElement {
  const element = document.createElement("p");

  element.classList.add("popup__content__moves");
  element.innerText = `You made ${game.getMoveCount()} moves`;

  return element;
}

function PopupH2(): HTMLElement {
  const element = document.createElement("h2");

  element.classList.add("popup__content__header");
  element.innerText = "Congratulations 🎉";

  return element;
}

function PopupContent(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("popup__content");

  element.appendChild(PopupH2());
  element.appendChild(PopupMoves());
  element.appendChild(PopupTime());
  element.appendChild(PopupPlayAgainButton());

  return element;
}

function PopupOverlay(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("popup__overlay");

  element.appendChild(PopupContent());

  return element;
}

function Popup(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("popup");

  element.appendChild(PopupOverlay());

  return element;
}

function Card(card: { name: string; isVisible: () => boolean }): HTMLElement {
  const element = document.createElement("div");
  const reverseImg = document.createElement("img");
  const obverseImg = document.createElement("img");
  let lockClick = false;

  reverseImg.src = "/img/klogo.png";
  reverseImg.classList.add("memory-game__card__back");

  obverseImg.src = `/img/${card.name}.png`;
  obverseImg.classList.add("memory-game__card__front");

  element.classList.add("memory-game__card");

  element.appendChild(reverseImg);

  reactive(() => {
    if (card.isVisible()) {
      element.appendChild(obverseImg);
      element.classList.add("flip");
      lockClick = true;

      onCleanup(() => {
        element.classList.remove("flip");
        setTimeout(() => {
          element.removeChild(obverseImg);
          lockClick = false;
        }, 100);
      });
    }
  });

  element.addEventListener("click", () => {
    if (lockClick) return;
    game.chooseCard(card);
  });

  return element;
}

function MemoryGame(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("memory-game");

  game.initCardStack();

  reactive(() => {
    const cardsElements: HTMLElement[] = [];

    game.getCardStack().forEach((card) => {
      const cardElement = Card(card);
      cardsElements.push(cardElement);
      element.appendChild(cardElement);
    });

    onCleanup(() => {
      cardsElements.forEach((cardElement) => {
        cardElement.remove();
      });
    });
  });
  return element;
}

function ResetGameButton(): HTMLElement {
  const element = document.createElement("button");

  element.type = "button";
  element.id = "reset-game";
  element.classList.add("button--reset-game");
  element.innerText = "reset game";
  element.addEventListener("click", game.resetGame);

  return element;
}

function Moves(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("score-panel__moves");

  reactive(() => {
    element.innerText = `${game.getMoveCount()} moves`;
  });

  return element;
}

function Stopwatch(): HTMLElement {
  const element = document.createElement("div");

  element.id = "display";
  element.classList.add("score-panel__stopwatch");

  reactive(() => {
    element.innerText = game.getTime();
  });

  return element;
}

function ScorePanel(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("score-panel");

  element.appendChild(Stopwatch());
  element.appendChild(Moves());
  element.appendChild(ResetGameButton());

  return element;
}

function App(): HTMLElement {
  const element = document.createElement("div");

  element.appendChild(ScorePanel());
  element.appendChild(MemoryGame());

  reactive(() => {
    if (game.isEndGame() === true) {
      const popup = Popup();
      element.appendChild(popup);

      onCleanup(() => {
        element.removeChild(popup);
      });
    }
  });

  return element;
}

function render(element: HTMLElement) {
  document.body.appendChild(element);
}

root(() => {
  render(App());
});
