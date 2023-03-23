/* eslint-disable no-console */
/* eslint-disable global-require */
const { app, BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize();

const ipc = ipcMain;

let win;

const path = require('path');
const isDev = require('electron-is-dev');

if (isDev) {
  require('electron-reload');
}

function createWindow() {
  win = new BrowserWindow({
    width: isDev ? 1000 : 500,
    height: 650,
    minWidth: 500,
    minHeight: 650,
    resizable: true,
    movable: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      devTools: !!isDev,
    },
  });

  if (isDev) { win.webContents.openDevTools(); }

  require('@electron/remote/main').enable(win.webContents);

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  win.on('closed', () => {
    win = null;
  });

  win.on('maximize', () => {
    win.webContents.send('isMaximized');
  });

  win.on('unmaximize', () => {
    win.webContents.send('isRestored');
  });

  ipc.on('minimizeApp', () => {
    win.minimize();
  });

  ipc.on('maximizeRestoreApp', () => {
    if (win.isMaximized()) {
      win.restore();
    } else win.maximize();
  });

  ipc.on('closeApp', () => {
    win.close();
  });
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
