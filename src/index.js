const electron = require('electron')
const path = require('path')
const { BrowserWindow } = electron.remote
const loader = require('monaco-loader')
const ipc = electron.ipcRenderer
const { dialog } = require('electron').remote

/*** EDITOR       ***/
/********************/

let editor

loader().then((monaco) => {
  const div = document.getElementById('container')

  editor = monaco.editor.create(div, {
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true
  })
})

function insertText(text) {
  var line = editor.getPosition()
  var range = new monaco.Range(line.lineNumber, 1, line.lineNumber, 1)
  var id = { major: 1, minor: 1 }           
  var text = "Value from Modal: " + text + "\n"
  var op = {identifier: id, range: range, text: text, forceMoveMarkers: true}
  editor.executeEdits("my-source", [op])
}


/*** Modal Win    ***/
/********************/

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


/*** NOTIFY       ***/
/********************/

let myNotification = null

const options = {
    type: 'question',
    buttons: ['Cancel', 'Yes, please', 'No, thanks'],
    defaultId: 2,
    title: 'Question',
    message: 'Do you want to do this?',
    detail: 'It does not really matter',
    checkboxLabel: 'Remember my answer',
    checkboxChecked: true,
  };

const notification = {
  body: 'Message sent',
  icon: path.join(__dirname, '../assets/images/alert.png')
}

ipc.on('notify', function (event, arg) {
  insertText(arg)
  myNotification = new window.Notification('Alert', notification)

  myNotification.onclick = () => {
    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
    console.log(response);
    console.log(checkboxChecked);
  });
  }
})

