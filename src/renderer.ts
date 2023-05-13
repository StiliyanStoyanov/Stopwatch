import './index.css';
import { stopwatchSetup } from "./util/stopwatch";

stopwatchSetup();

const keepOnTopButton = document.getElementById('keep-on-top-button');

keepOnTopButton.addEventListener('click', () => {
    console.log('keep on top');
    keepOnTopButton.classList.toggle("active-fill");
    window.electronAPI.keepOnTop();
})

// minimize.addEventListener('click', () => {
//     window.electronAPI.minimize();
// })


