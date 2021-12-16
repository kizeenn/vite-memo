import { For } from "@vzn/rendering";
import { createMemoGame } from "vite-memo/games/memo";
import { CardBlock } from "./card";
import Popup from "./popup";

export default function MemoGame() {
  const game = createMemoGame();
  game.initCardStack();

  return (
    <div class="score-panel">
      <div class="score-panel__stopwatch">{game.getTime}</div>

      <div class="score-panel__moves">{game.getMoveCount} moves</div>

      <button onClick={game.resetGame} type="button" class="button--reset-game">
        reset game
      </button>

      <div class="memory-game">
        <For each={[...game.getCardStack()]}>
          {(card) => <CardBlock card={card} game={game} />}
        </For>
      </div>
      {game.isEndGame() ? <Popup game={game} /> : null}
    </div>
  );
}
