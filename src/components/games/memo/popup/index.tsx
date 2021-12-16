import type { MemoGame } from "vite-memo/games/memo";

export interface PopupProps {
  game: MemoGame;
}

export default function Popup(props: PopupProps) {
  return (
    <div class="popup">
      <div class="popup__overlay">
        <div class="popup__content">
          <h2 class="popup__content__header">Congratulations 🎉</h2>
          <p class="popup__content__moves">
            You made {props.game.getMoveCount} moves
          </p>
          <p class="popup__content__timer"> in {props.game.getTime}</p>
          <button
            type="button"
            class="button--play--again"
            onClick={props.game.resetGame}
          >
            play again
          </button>
        </div>
      </div>
    </div>
  );
}
