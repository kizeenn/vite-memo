import "./style.css";
import {
  chooseCard,
  initGame,
  setOnTimeChange,
  setOnCounterChange,
  setOnEndGame,
  moveCount,
  stopwatch,
} from "./game";

function PopupPlayAgainButton(): HTMLElement {
  const element = document.createElement("button");

  element.type = "button";
  element.id = "play-again";
  element.classList.add("button--play-again");
  element.innerText = "play again";

  return element;
}

function PopupTime(): HTMLElement {
  const element = document.createElement("p");

  element.classList.add("popup__content__timer");
  element.innerText = `in ${stopwatch}`;

  return element;
}

function PopupMoves(): HTMLElement {
  const element = document.createElement("p");

  element.classList.add("popup__content__moves");
  element.innerText = `You made ${moveCount} moves`;

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

function Card(card: { name: string }): HTMLElement {
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

  element.addEventListener("click", () => {
    if (lockClick) return;

    chooseCard(
      card,
      () => {
        element.appendChild(obverseImg);
        element.classList.add("flip");
        lockClick = true;
      },
      () => {
        element.classList.remove("flip");
        setTimeout(() => {
          element.removeChild(obverseImg);
          lockClick = false;
        }, 100);
      }
    );
  });

  // element.removeChild(obverseImg);

  return element;
}

function MemoryGame(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("memory-game");

  const cardStack = initGame();

  cardStack.forEach((card) => {
    element.appendChild(Card(card));
  });

  return element;
}

function ResetGameButton(): HTMLElement {
  const element = document.createElement("button");

  element.type = "button";
  element.id = "reset-game";
  element.classList.add("button--reset-game");
  element.innerText = "reset game";

  return element;
}

function Moves(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("score-panel__moves");
  element.innerText = "0 moves";

  setOnCounterChange((moves: number) => {
    element.innerText = `${moves} moves`;
  });

  return element;
}

function Stopwatch(): HTMLElement {
  const element = document.createElement("div");

  element.id = "display";
  element.classList.add("score-panel__stopwatch");
  element.innerText = "00:00:00";

  setOnTimeChange((time: string) => {
    element.innerText = time;
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

  setOnEndGame(() => {
    element.appendChild(Popup());
  });

  return element;
}

function render(element: HTMLElement) {
  document.body.appendChild(element);
}

render(App());
