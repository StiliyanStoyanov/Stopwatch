export interface electronAPI {
    keepOnTop: () => void
}

declare global {
    interface Window {
        electronAPI: electronAPI
    }
}