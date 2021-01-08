const electron = require('electron')
const path = require('path')
const { BrowserWindow } = electron.remote
const loader = require('monaco-loader')

loader().then((monaco) => {
  const div = document.getElementById('container')

  editor = monaco.editor.create(div, {
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true
  })
})

const newWin = document.getElementById('newWin')

newWin.addEventListener('click', function (event) {
  const modalPath = path.join('file://',__dirname,'window.html')
  let win = new BrowserWindow({
    frame: false,
    alwaysOnTop: true,
    width: 400, 
    height: 200, 
    backgroundColor: '#282923',   
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  //win.webContents.openDevTools()
  win.on('close', function () {win=null})
  win.loadURL(modalPath)
  win.show()
})