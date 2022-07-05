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
        }, 200);
      });
    }
  });

  return (
    <div
      onClick={() => {
        if (showObverse()) return;
        props.game.chooseCard(props.card);
      }}
      class="memory-game__card transform-preserve scale-100 duration-500 aspect-square rounded-xl"
      classList={{ flip: props.card.isVisible() }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="select-none align-middle bg-slate-800 rounded-xl"
        pointer-events="none"
        viewBox="0 0 100 100"
      >
        <text
          font-size="70"
          y="50%"
          x="50%"
          dy="0.35em"
          text-anchor="middle"
          pointer-events="none"
          stroke="white"
          stroke-opacity="35%"
        >
          ?
        </text>
      </svg>

      {showObverse() ? (
        <img
          src={`/img/${props.card.name}.png`}
          class="rotate-y-180 backface-hidden select-none pointer-events-none bg-slate-800 rounded-xl h-full w-full object-contain p-4 duration-500 absolute top-0"
        />
      ) : null}
    </div>
  );
}