export function createLapHeader() {
    const template = document.createElement('template');
    const templateString = `
    <div class="lap-row laps-inner-container">
        <h3>Laps</h3>
        <h3>Time</h3>
        <h3>Total</h3>
    </div>
    `
    templateString.trim();
    template.innerHTML = templateString
    return template.content;
}
export function createLapTracker(lapCount: number, lapTime: string, totalTime: string) {
    const template = document.createElement('template');
    const templateString = `
    <div id="laps-tracker" class="laps-inner-container">
        <div class="lap-row">
            <p>${lapCount}<span id="fastest">&nbsp;Fastest</span><span id="slowest">&nbsp;Slowest</span></p>
            <p>${lapTime}</p>
            <p>${totalTime}</p>
        </div>
    </div>
    `
    templateString.trim();
    template.innerHTML = templateString
    return template.content;
}

export function createLapRowElement(lapCount:number, lapTime: string, totalTime: string, isFastest: boolean, isSlowest: boolean) {
    const lapRowElement = document.createElement('div');
    const lapCountElement = document.createElement('p');
    const lapTimeElement = document.createElement('p');
    const totalTimeElement = document.createElement('p');
    lapRowElement.className = "lap-row"
    lapCountElement.textContent = lapCount.toString();
    lapTimeElement.textContent = lapTime;
    totalTimeElement.textContent = totalTime;

    if (isFastest) {
        lapCountElement.append(document.getElementById('fastest'));
    }

    if (isSlowest) {
        lapCountElement.append(document.getElementById('slowest'));
    }
    lapRowElement.append(lapCountElement);
    lapRowElement.append(lapTimeElement);
    lapRowElement.append(totalTimeElement);
    return lapRowElement;
}

export function createElementWithText(tagName: keyof HTMLElementTagNameMap, textContent: number | string) {
    const element = document.createElement(tagName);
    element.textContent = textContent.toString()
    return element;
}