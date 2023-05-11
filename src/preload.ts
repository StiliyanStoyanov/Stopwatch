// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// https://www.electronjs.org/docs/latest/tutorial/context-isolation
const { contextBridge, ipcRenderer } = require('electron');

const electronAPI = {
    keepOnTop: () => ipcRenderer.send('keep-on-top'),
    minimize: () => ipcRenderer.send('minimize')
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI);