const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell = require('electron').shell;
require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron.cmd')
})

const isMac = process.platform === 'darwin'

let mainWindow;

console.log(__dirname)

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname+'/img/icon.png',
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

  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
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