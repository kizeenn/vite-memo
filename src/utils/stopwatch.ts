import { createValue } from "@vzn/reactivity";

function formatTimeNumber(num: number): string {
  // stopwatch will display 0 before number if it's less than 10 eg. 09 instead of 9
  return num < 10 ? `0${num}` : `${num}`;
}

function formatTime(startDate: Date, endDate: Date): string {
  // calculate passed time
  const time = endDate.getTime() - startDate.getTime();

  // we calculate passed minutes from miliseconds by converting them into seconds (/1000), minutes (/60)
  // math.floor is used to calculate only full minutes
  const minutes = Math.floor(time / 1000 / 60);

  // time is given in miliseconds, time - minutes (*60 *1000 is making them back miliseconds) /1000 = seconds
  const seconds = Math.floor((time - minutes * 60 * 1000) / 1000);
  
  // time is given in miliseconds, time - minutes (*60 *1000 is making them back miliseconds) - (seconds *1000 is making them back miliseconds /10 to two decimal places.
  const miliseconds = Math.floor(
    (time - minutes * 60 * 1000 - seconds * 1000) / 10
  );

  // adds ":" between minutes and seconds
  return [minutes, seconds, miliseconds]
    .map((n) => formatTimeNumber(n))
    .join(":");
}

export function createStopwatch() {
  let startDate: Date | undefined;
  let timerInterval: number;

  const [getTime, setTime] = createValue("00:00:00");

  function start() {
    // prevent from starting stopwatch twice
    if (startDate) return;

    startDate = new Date();

    // comparing start game time to current time, stopwatch works on this time difference.
    timerInterval = setInterval(() => {
      if (startDate) setTime(formatTime(startDate, new Date()));
    }, 10);
  }

  function stop() {
    // prevent from starting stopwatch by itself
    if (!startDate) return;

    // resets old stopwatch time, lets start once again
    clearInterval(timerInterval);
  }

  function reset() {
    stop();

    // remove stopwatch start time to set new
    startDate = undefined;

    // display 00:00:00 instead of end time
    setTime("00:00:00");
  }

  return {
    getTime,
    start,
    stop,
    reset,
  };
}
