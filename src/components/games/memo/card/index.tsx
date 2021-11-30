import { reactive, onCleanup, createValue } from "@vzn/reactivity";
import type { Card, MemoGame } from "vite-memo/games/memo";

export interface CardBlockProps {
  card: Card;
  game: MemoGame;
}

export function CardBlock(props: CardBlockProps) {
  const [showObverse, setObverse] = createValue(props.card.isVisible());

  reactive(() => {
    if (props.card.isVisible()) {
      setObverse(true);

      onCleanup(() => {
        setTimeout(() => {
          setObverse(false);
        }, 100);
      });
    }
  });

  return (
    <div
      on:click={() => {
        if (showObverse()) return;
        props.game.chooseCard(props.card);
      }}
      class="memory-game__card"
      classList={{ flip: props.card.isVisible() }}
    >
      <img src="/img/klogo.png" class="memory-game__card__back" />

      {showObverse() ? (
        <img
          src={`/img/${props.card.name}.png`}
          class="memory-game__card__front"
        />
      ) : null}
    </div>
  );
}
