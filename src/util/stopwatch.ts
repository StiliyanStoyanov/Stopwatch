type timesString = [hours: string, minutes: string, seconds: string, milliseconds: string];
type onIntervalTickCallback = (params: timesString) => void
interface stopwatchInterface {
    startTimer: (onIntervalTick: onIntervalTickCallback) => void
    pauseTimer: () => void;
    resetTimer: () => void;
    lapTimer: () => void;
}

function createElementWithText(tagName: keyof HTMLElementTagNameMap, textContent: string) {
    const element = document.createElement(tagName);
    element.textContent = textContent
    return element;
    
}

function formatTime(currentTime: number): timesString {
    return [
        Math.floor(currentTime / 6000),
        Math.floor(currentTime / 600),
        Math.floor(currentTime / 10), 
        currentTime % 10 * 10
    ].map(time => time <= 9 ? `0${time}` : time.toString()) as timesString
}

export function stopwatch(): stopwatchInterface {
    let intervalId: NodeJS.Timer;
    let currentTime = 0;
    let previousTimer = 0;
    let fastestTimer = 0;
    let slowestTimer = 0;
    
    const startTimer = (onIntervalTick: onIntervalTickCallback) => {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            currentTime++;
            onIntervalTick(formatTime(currentTime));
        }, 100);
    }

    const pauseTimer = () => {
        clearInterval(intervalId);
    }

    const resetTimer = () => {
        clearInterval(intervalId);
        currentTime = 0;
    }

    const lapTimer = () => {
        currentTime - fastestTimer
        console.log('flag button clicked');
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
    const laps = document.getElementById('laps');
    const time = document.getElementById('time');
    const total = document.getElementById('total');
    const lapsHeading = createElementWithText('h3', 'Laps');
    const timeHeading = createElementWithText('h3', 'Time');
    const totalHeading = createElementWithText('h3', 'Total');

    let paused = true;
    let isRunning = false;
    const { startTimer, pauseTimer, resetTimer, lapTimer } = stopwatch();

    startPauseButton.addEventListener('click', () => {
        startPauseButton.classList.toggle("active");
        // Pauses the timer if it is not paused
        if (!paused) {
            console.log('timer is paused');
            paused = true;
            flagButton.disabled = true;
            flagButton.classList.remove('active-fill');
            pauseTimer();
            return;
        }
        // Keeps reset enabled only when there is time on the timer
        if (!isRunning) {
            resetButton.classList.toggle('active-stroke');
            resetButton.disabled = false;
        }

        console.log('timer is running');
        // Disables flag button when timer is paused
        flagButton.disabled = false;
        flagButton.classList.add('active-fill');
        // Updates timer state
        paused = false;
        isRunning = true;
        // Interval callback per 100ms tick with current times as an array
        startTimer(([hours, minutes, seconds, milliseconds]) => {
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes;
            secondsElement.textContent = seconds;
            millisecondsElement.textContent = milliseconds;
        })
    })

    resetButton.addEventListener('click', () => {  
        console.log('timer is reset');
        // Changes button state to play if it is currently running
        if (!paused) startPauseButton.classList.toggle('active');

        // Disables and resets flag time track and reset button states to disabled on reset
        resetButton.classList.toggle('active-stroke');
        resetButton.disabled = true;
        flagButton.disabled = true;
        flagButton.classList.remove('active-fill');
        // Updates timer status
        paused = true;
        isRunning = false;
        // Resets main timer elements
        hoursElement.textContent = '00'
        minutesElement.textContent = '00'
        secondsElement.textContent = '00'
        millisecondsElement.textContent = '00'

        laps.textContent = ''
        time.textContent = ''
        total.textContent = ''

        // Clears timers in utility function
        resetTimer();
    })

    flagButton.addEventListener('click', () => {
        lapTimer();
    })
}