import { contextBridge, ipcRenderer } from 'electron'

try {
  contextBridge.exposeInMainWorld('loginOrRegister', {
    isLogin: (isLogin) => ipcRenderer.send('loginOrRegister', isLogin)
  })
} catch (error) {
  console.error(error)
}