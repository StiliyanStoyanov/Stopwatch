import "./styles/timer.css";
import "./styles/buttons.css";
import "./styles/controlls.css";
import "./styles/laps.css";
import "./styles/scrollbar.css";
import "./styles/utility.css";
import "./styles/index.css";

import { stopwatchViewSetup } from "./util/stopwatch";

stopwatchViewSetup();

const keepOnTopButton = document.getElementById('keep-on-top-button');

keepOnTopButton.addEventListener('click', () => {
    console.log('keep on top');
    keepOnTopButton.classList.toggle("active-fill");
    window.electronAPI.keepOnTop();
})


