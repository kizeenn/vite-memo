import type { MemoGame } from "vite-memo/games/memo";

export interface ScoreboardProps {
  game: MemoGame;
}

export default function Scoreboard(props: ScoreboardProps) {
  return (
    <div class="flex justify-evenly items-center bg-slate-800 sm:rounded-b-full w-full">
      <p class="text-lg sm:text-4xl text-gray-200 font-bold min-w-[120px] sm:min-w-[270px]">
        {props.game.getMoveCount} moves
      </p>

      <p class="font-body text-3xl sm:text-6xl text-gray-200 font-bold min-w-[120px] sm:min-w-[270px] text-center">
        {props.game.getTime}
      </p>

      <button
        onClick={props.game.resetGame}
        type="button"
        class="text-lg sm:text-3xl text-center text-gray-200 font-bold min-w-[120px] sm:min-w-[270px]"
      >
        reset game
      </button>
    </div>
  );
}
