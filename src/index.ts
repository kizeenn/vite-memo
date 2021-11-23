import "./style.css";

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
  element.innerText = " in 00:00:00";

  return element;
}

function PopupMoves(): HTMLElement {
  const element = document.createElement("p");

  element.classList.add("popup__content__moves");
  element.innerText = "You made 0 moves";

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

function Card(): HTMLElement {
  const element = document.createElement("div");
  element.classList.add("memory-game__card");

  const img = document.createElement("img");

  img.classList.add("memory-game__card__back");
  img.src = "/img/klogo.png";

  element.appendChild(img);

  return element;
}

function MemoryGame(): HTMLElement {
  const element = document.createElement("div");

  element.classList.add("memory-game");

  element.appendChild(Card());

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

  return element;
}

function Stopwatch(): HTMLElement {
  const element = document.createElement("div");

  element.id = "display";
  element.classList.add("score-panel__stopwatch");
  element.innerText = "00:00:00";

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
  element.appendChild(Popup());

  return element;
}

function render(element: HTMLElement) {
  document.body.appendChild(element);
}

render(App());
