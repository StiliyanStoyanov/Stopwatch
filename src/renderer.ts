import './index.css';
import { stopwatchSetup } from "./util/stopwatch";

stopwatchSetup();

const keepOnTopButton = document.getElementById('keep-on-top');
const minimize = document.getElementById('minimize');

keepOnTopButton.addEventListener('click', () => {
    console.log('keep on top');
    window.electronAPI.keepOnTop();
})

// minimize.addEventListener('click', () => {
//     window.electronAPI.minimize();
// })


