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

export function stopwatchSetup() {
    const startPauseButton = document.getElementById('start-pause-button');
    const playPause = document.getElementById('play-pause')
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const millisecondsElement = document.getElementById('milliseconds');
    let paused = true;
    let isRunning = false;
    const { startTimer, pauseTimer, resetTimer } = stopwatch();

    startPauseButton.addEventListener('click', () => {
        startPauseButton.classList.toggle("active");
        if (!paused) {
            console.log('timer is paused');
            pauseTimer();
            paused = true;
            return;
        }
        if (!isRunning) {
            resetButton.classList.toggle('sb-active');
            resetButton.disabled = false;
        }

        console.log('timer is running');
        paused = false;
        isRunning = true
        startTimer(([hours, minutes, seconds, milliseconds]) => {
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;
            secondsElement.textContent = seconds;
            millisecondsElement.textContent = milliseconds;
        })
    })

    resetButton.addEventListener('click', () => {  
        console.log('timer is reset');
        if (!paused) startPauseButton.classList.toggle("active");
        resetButton.classList.toggle('sb-active');
        resetButton.disabled = true;
        paused = true;
        isRunning = false;
        hoursElement.textContent = '00'
        minutesElement.textContent = '00'
        secondsElement.textContent = '00'
        millisecondsElement.textContent = '00'
        resetTimer();
    })
}