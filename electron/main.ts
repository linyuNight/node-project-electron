import { app, BrowserWindow, ipcMain } from 'electron'
const { exec } = require('child_process');
import path from 'node:path'
const os = require('os');
const { 
  mouse,
  Point
  // Region,
  // straightTo,
  // centerOf
} = require('@nut-tree/nut-js');
// import '@/assets/css/common.css'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')

let handlerGetIP = () => {
  const networkInterfaces = os.networkInterfaces();
  return networkInterfaces.en1[1].address
}

let handlerExec = async (event: any, params: any) => {
  // console.log(event)
  return new Promise((resolve, reject) => {
    const command = `${params.commandInput}`
    exec(command, (err: any, stdout: any, stderr: any) => {
      // console.log(err,stdout,stderr)
      if (err) {
        reject({
          content: err
        })
      } else {
        resolve({
          content: stdout || stderr
        })
      }    
    })
  })
}

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.webContents.openDevTools()

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  ipcMain.handle('getIP', handlerGetIP)
  ipcMain.handle('handlerExec', handlerExec)
  ipcMain.on('set-mouse-position', async (event: any,params: any) => {
    let point = new Point(Number(params.x), Number(params.y))
    await mouse.setPosition(point)
    await mouse.rightClick()
    await mouse.rightClick()
  })
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)
