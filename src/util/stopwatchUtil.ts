export type timesStringArray = [hours: string, minutes: string, seconds: string, milliseconds: string];

function getCustomTimeArray(time: number): [hours: number, minutes: number, seconds: number, milliseconds: number] {
    return [ 
        Math.floor(time / 6000),
        Math.floor(time / 600), 
        Math.floor(time / 10), 
        time % 10 * 10
    ]
}
function addLeadingZero(time: number) {
    return time <= 9 ? `0${time}` : time.toString();
}

export function formatTime(time: number): timesStringArray {
    return getCustomTimeArray(time).map(time => addLeadingZero(time)) as timesStringArray
}

/**
 * Return format: 00:00:00:00
 *  @type {string}
 */
export function formatTimeToString(time: number) {
    return formatTime(time).reduce((accumulator, currentValue) => accumulator += `:${currentValue}`);
}
