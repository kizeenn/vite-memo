import { createStopwatch } from "../../src/utils/stopwatch";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Utils | Stopwatch", () => {
  test("returns time", async () => {
    const stopwatch = createStopwatch();

    expect(stopwatch.getTime()).toBe("00:00:00");

    stopwatch.start();

    await wait(100);

    expect(stopwatch.getTime()).not.toBe("00:00:00");
  });

  test("starts stopwatch", async () => {
    const stopwatch = createStopwatch();

    expect(stopwatch.getTime()).toBe("00:00:00");

    stopwatch.start();

    await wait(100);

    expect(stopwatch.getTime()).not.toBe("00:00:00");
  });

  test("stops stopwatch", async () => {
    const stopwatch = createStopwatch();

    stopwatch.start();
    await wait(100);
    stopwatch.stop();

    const stopTime = stopwatch.getTime();

    await wait(100);

    expect(stopwatch.getTime()).toBe(stopTime);
  });

  test("reset stopwatch", async () => {
    const stopwatch = createStopwatch();

    stopwatch.start();
    await wait(100);

    expect(stopwatch.getTime()).not.toBe("00:00:00");

    stopwatch.reset();
    expect(stopwatch.getTime()).toBe("00:00:00");

    await wait(100);

    expect(stopwatch.getTime()).toBe("00:00:00");
  });
});
