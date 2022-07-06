import { For } from "@vzn/rendering";
import { createMemoGame } from "vite-memo/games/memo";
import { CardBlock } from "./card";
import Popup from "./popup";
import Scoreboard from "./scoreboard";

export default function MemoGame() {
  const game = createMemoGame();
  game.initCardStack();

  return (
    <div class="h-screen flex flex-col items-center">
      <Scoreboard game={game} />

      <div class="perspective-1k grid grid-cols-4 mt-5 gap-4 px-4 w-full sm:w-3/4 lg:w-2/5">
        <For each={[...game.getCardStack()]}>
          {(card) => <CardBlock card={card} game={game} />}
        </For>
      </div>

      {game.isEndGame() ? <Popup game={game} /> : null}
    </div>
  );
}
