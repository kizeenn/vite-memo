import type { MemoGame } from "vite-memo/games/memo";

export interface ScoreboardProps {
  game: MemoGame;
}

export default function Scoreboard(props: ScoreboardProps) {
  return (
    <div class="flex justify-between px-4 sm:px-10 items-center bg-slate-800 sm:rounded-b-full w-full lg:w-2/3">
      <p class="text-lg md:text-2xl text-gray-200 font-bold min-w-[105px]">
        {props.game.getMoveCount} moves
      </p>

      <p class="font-body text-3xl sm:text-6xl text-gray-200 font-bold min-w-[120px] sm:min-w-[270px] text-center">
        {props.game.getTime}
      </p>

      <button
        onClick={props.game.resetGame}
        type="button"
        class="text-lg md:text-2xl text-center text-gray-200 font-bold"
      >
        reset game
      </button>
    </div>
  );
}
