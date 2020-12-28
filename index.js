const {app, BrowserWindow} = require('electron')


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname+'/img/icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile("renderer.html")

  //win.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if(process.platform!=='darwin') {
    app.quit();
  }
})