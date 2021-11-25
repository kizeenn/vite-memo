import { createValue } from "@vzn/reactivity";

function formatTimeNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

function formatTime(startDate: Date, endDate: Date): string {
  const time = endDate.getTime() - startDate.getTime();
  const minutes = Math.floor(time / 1000 / 60);
  const seconds = Math.floor((time - minutes * 60 * 1000) / 1000);

  const miliseconds = Math.floor(
    (time - minutes * 60 * 1000 - seconds * 1000) / 10
  );

  return [minutes, seconds, miliseconds]
    .map((n) => formatTimeNumber(n))
    .join(":");
}

export function createStopwatch() {
  let startDate: Date | undefined;
  let timerInterval: number;

  const [getTime, setTime] = createValue("00:00:00");

  function start() {
    if (startDate) return;

    startDate = new Date();

    timerInterval = setInterval(() => {
      if (startDate) setTime(formatTime(startDate, new Date()));
    }, 10);
  }

  function stop() {
    if (!startDate) return;
    clearInterval(timerInterval);
  }

  function reset() {
    stop();
    startDate = undefined;
    setTime("00:00:00");
  }

  return {
    getTime,
    start,
    stop,
    reset,
  };
}
