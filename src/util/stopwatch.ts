type times = [hours: number, minutes: number, seconds: number, milliseconds: number];
type currentTime = [hours: string, minutes: string, seconds: string, milliseconds: string];
type onIntervalTickCallback = (params: currentTime) => void
interface stopwatchInterface {
    startTimer: (onIntervalTick: onIntervalTickCallback) => void
    pauseTimer: () => void;
    resetTimer: () => void;
    lapTimer: () => void;
}

function formatTime(time: number): string {
    return time <= 9 ? `0${time}` : time.toString();
}

export function stopwatch(): stopwatchInterface {
    let intervalId: NodeJS.Timer;
    let paused = true;
    let [hours, minutes, seconds, milliseconds]: times = [0, 0, 0, 0];
    let lapTimers: times[] = [];
    
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
        lapTimers = [];
        hours = 0; minutes = 0; seconds = 0; milliseconds = 0;
    }

    const lapTimer = () => {
        console.log('flag button clicked')
        lapTimers.push([hours, minutes, seconds, milliseconds])
        console.log(lapTimers)
    }

    return {
        startTimer,
        pauseTimer,
        resetTimer,
        lapTimer
    }
}

export function stopwatchSetup() {
    const startPauseButton = document.getElementById('start-pause-button');
    const flagButton = document.getElementById('flag-button') as HTMLButtonElement;
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const millisecondsElement = document.getElementById('milliseconds');
    let paused = true;
    let isRunning = false;
    const { startTimer, pauseTimer, resetTimer, lapTimer } = stopwatch();

    startPauseButton.addEventListener('click', () => {
        startPauseButton.classList.toggle("active");
        if (!paused) {
            console.log('timer is paused');
            paused = true;
            flagButton.disabled = true;
            flagButton.classList.remove('active-fill');
            pauseTimer();
            return;
        }
        if (!isRunning) {
            resetButton.classList.toggle('active-stroke');
            resetButton.disabled = false;
        }

        console.log('timer is running');
        flagButton.disabled = false;
        flagButton.classList.add('active-fill');
        paused = false;
        isRunning = true;
        startTimer(([hours, minutes, seconds, milliseconds]) => {
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;
            secondsElement.textContent = seconds;
            millisecondsElement.textContent = milliseconds;
        })
    })

    resetButton.addEventListener('click', () => {  
        console.log('timer is reset');
        if (!paused) startPauseButton.classList.toggle('active');
        resetButton.classList.toggle('active-stroke');
        resetButton.disabled = true;
        flagButton.disabled = true;
        paused = true;
        isRunning = false;
        flagButton.classList.remove('active-fill');
        hoursElement.textContent = '00'
        minutesElement.textContent = '00'
        secondsElement.textContent = '00'
        millisecondsElement.textContent = '00'
        resetTimer();
    })

    flagButton.addEventListener('click', () => {
        lapTimer();
    })
}