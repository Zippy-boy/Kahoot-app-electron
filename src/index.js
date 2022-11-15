const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 437,
    height: 750,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const createHelpWindow = () => {
  const helpWindow = new BrowserWindow({
    width: 250,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,
  });

  helpWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer/help.html'),
    protocol: 'file:',
    slashes: true
  }));
};

const menu = Menu.buildFromTemplate([
  {
    role: 'fileMenu'
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: createHelpWindow
      },
    ],
  },
  {
    label: 'Developer',
    submenu: [
      {
        role: 'reload'
      },
      {
        role: 'toggledevtools'
      },
    ],
  },
]);
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

