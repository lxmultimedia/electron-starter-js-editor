const {app, BrowserWindow} = require('electron')

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: 
      true
    } 
  })
  mainWindow.loadFile("renderer.html")
})