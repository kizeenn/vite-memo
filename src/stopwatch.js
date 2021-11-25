import { reactive, createValue } from "@vzn/reactivity";

let startTime;
let endTime;
let timerInterval;

export const [getTime, setTime] = createValue("00:00:00");

function formatTimeNumber(num) {
  return num < 10 ? `0${num}` : num;
}

function formatTime(startDate, endDate) {
  const time = endDate - startDate;
  const minutes = Math.floor(time / 1000 / 60);
  const seconds = Math.floor((time - minutes * 60 * 1000) / 1000);
  const miliseconds = Math.floor(
    (time - minutes * 60 * 1000 - seconds * 1000) / 10
  );

  return [minutes, seconds, miliseconds]
    .map((n) => formatTimeNumber(n))
    .join(":");
}

export function startTimer() {
  if (startTime) return;

  startTime = new Date();

  reactive(() => {
    timerInterval = setInterval(() => {
      setTime(formatTime(startTime, new Date()));
    }, 10);
  });
}

// export function startTimer(onTimeChange) {
//   if (startTime) return;

//   startTime = new Date();

//   timerInterval = setInterval(() => {
//     onTimeChange(formatTime(startTime, new Date()));
//   }, 10);
// }

export function stopTimer() {
  if (!startTime) return;
  clearInterval(timerInterval);
}

export function resetTimer() {
  stopTimer();
  startTime = undefined;
}
