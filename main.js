const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;
/*
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron.cmd')
})
*/
const ipc = require('electron').ipcMain

const isMac = process.platform === 'darwin'


/*** WINDOW HANDLING      ***/
/****************************/

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: __dirname+'/assets/images/icon.png',
    backgroundColor: '#1E1E1E',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'/src/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null;
  })


  mainWindow.on('ready-to-show', function() {
      mainWindow.show();
      mainWindow.focus();
  });



/*** MENU        ***/
/*******************/

  var menu = Menu.buildFromTemplate([
    {
      label: 'Main',
      submenu: [
      {
        label: 'StackBlitz',
        click: () => {
          shell.openExternal('https://stackblitz.com');
        },
        accelerator: 'CmdOrCtrl+Shift+C'
      },
      {type:'separator'},
      {
        label: 'Exit',
        click: () => {
          app.quit();
        }
      }]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startSpeaking' },
              { role: 'stopSpeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]   
    },
    {
      label: 'Info',
      click: () => {
        
      }
    },    
  ])
  Menu.setApplicationMenu(menu);
}

/*** APP HANDLING      ***/
/*************************/

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform!=='darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if(win === null) {
    createWindow();
  }
})


/*** IPC      ***/
/*******************/

ipc.on('notify', function (event, arg) {
  mainWindow.webContents.send('notify', arg)
})