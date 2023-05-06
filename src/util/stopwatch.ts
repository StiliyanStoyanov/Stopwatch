type currentTime = [hours: string, minutes: string, seconds: string, milliseconds: string];
type onIntervalTickCallback = (params: currentTime) => void
interface stopwatchInterface {
    startTimer: (onIntervalTick: onIntervalTickCallback) => void
    pauseTimer: () => void;
    resetTimer: () => void;
}

function formatTime(time: number): string {
    return time <= 9 ? `0${time}` : time.toString();
}

export function stopwatch(): stopwatchInterface {
    let intervalId: NodeJS.Timer;
    let paused = true;
    let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];

    const startTimer = (onIntervalTick: onIntervalTickCallback) => {
        clearInterval(intervalId);
        paused = false;
        intervalId = setInterval(() => {
            minutes === 60 && (hours += 1) && (minutes = 0);
            seconds === 60 && (minutes += 1) && (seconds = 0);
            milliseconds+=10;
            milliseconds === 100 && (seconds += 1) && (milliseconds = 0);
            onIntervalTick([formatTime(hours), formatTime(minutes), formatTime(seconds), formatTime(milliseconds)]);
        }, 100);
    }

    const pauseTimer = () => {
        clearInterval(intervalId);
        paused = true;
    }

    const resetTimer = () => {
        clearInterval(intervalId);
        paused = true;
        hours = 0; minutes = 0; seconds = 0; milliseconds = 0;
    }

    return {
        startTimer,
        pauseTimer,
        resetTimer,
    }
}