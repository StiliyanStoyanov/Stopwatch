export interface IStopwatchAPI {
    start: () => Promise<void>,
}

declare global {
    interface Window {
        stopwatchAPI: IStopwatchAPI
    }
}