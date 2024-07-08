import { app, shell, BrowserWindow, webContents ,ipcMain, Tray, Menu} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const NODE_ENV = process.env.NODE_ENV

const login_width = 300;
const login_height = 345;
const register_height = 490;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: join(__dirname,'../../resources/icon.png'),
    width: login_width,
    height: login_height,
    show: false,
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    resizable: false,
    frame: true,
    transparent:true, 
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  // 接收渲染进程 注册登录状态
  ipcMain.on("loginOrRegister", (_event, isLogin) => {
    console.log('收到渲染进程消息 - isLogin :',isLogin);  
    mainWindow.setResizable(true);
    // 没有账号时 isLogin: false 显示注册页面
    if (isLogin) {
      mainWindow.setSize(login_width,login_height);
    } else {
      mainWindow.setSize(login_width,register_height);
    }
    mainWindow.setResizable(false);
  })

  //创建任务栏图标、菜单
  let tray  = new Tray(join(__dirname,'../../resources/icon.png'));
    const trayContextMenu = Menu.buildFromTemplate([
      {
        label: '打开',
        click: () => {
          mainWindow.show();
        }
      }, 
      {
        label: '退出',
        click: () => {
          app.quit();
        }
      }
    ]);
    
    tray.setToolTip('EasyChat');
    tray.on('click', () => {
      win.show();
    });
    tray.on('right-click', () => {
      tray.popUpContextMenu(trayContextMenu);
    });
}


app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.yckj.easychat')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
