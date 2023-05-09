export interface IElectronAPI {
    keepOnTop: () => void,
    minimize: () => void
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}