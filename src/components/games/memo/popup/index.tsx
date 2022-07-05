import type { MemoGame } from "vite-memo/games/memo";

export interface PopupProps {
  game: MemoGame;
}

export default function Popup(props: PopupProps) {
  return (
    <div class="absolute h-full w-full flex items-center justify-center">
      <div class="absolute bg-black h-full w-full opacity-25" />
      <div class="relative bg-gray-50 w-1/3 h-1/4 rounded-md border border-gray-300 py-5 flex flex-col justify-between items-center">
        <h2 class="font-bold text-3xl">Congratulations 🎉</h2>

        <p class="text-lg">
          You made {props.game.getMoveCount} moves in {props.game.getTime}
        </p>

        <button
          type="button"
          class="rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 text-sm"
          onClick={props.game.resetGame}
        >
          play again
        </button>
      </div>
    </div>
  );
}
