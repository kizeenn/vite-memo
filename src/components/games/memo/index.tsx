import { For } from "@vzn/rendering";
import { createMemoGame } from "vite-memo/games/memo";
import { CardBlock } from "./card";
import Popup from "./popup";

export default function MemoGame() {
  const game = createMemoGame();
  game.initCardStack();

  return (
    <div class="h-screen flex flex-col items-center">
      <div class="flex justify-evenly items-center bg-slate-800 sm:rounded-b-full w-full">
        <p class="text-lg sm:text-4xl text-gray-200 font-bold">
          {game.getMoveCount} moves
        </p>

        <p class="text-3xl sm:text-6xl text-gray-200 font-bold min-w-[120px] sm:min-w-[270px] text-center">
          {game.getTime}
        </p>

        <button
          onClick={game.resetGame}
          type="button"
          class="text-lg sm:text-3xl text-center text-gray-200 font-bold"
        >
          reset game
        </button>
      </div>

      <div class="perspective-1k grid grid-cols-4 mt-5 gap-4 px-4 w-full sm:w-3/4 lg:w-2/5">
        <For each={[...game.getCardStack()]}>
          {(card) => <CardBlock card={card} game={game} />}
        </For>
      </div>
      {game.isEndGame() ? <Popup game={game} /> : null}
    </div>
  );
}
