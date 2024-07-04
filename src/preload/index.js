import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('loginOrRegister', {
      isLogin: (isLogin) => ipcRenderer.send('loginOrRegister', isLogin)
    })
  } catch (error) {
    console.error(error)
  }
