const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer


const closeWin = document.getElementById('closeWin')

closeWin.addEventListener('click', function (event) {
  var win = remote.getCurrentWindow();
  win.close()
})

const notifyBtn = document.getElementById('notifyBtn')

notifyBtn.addEventListener('click', function () {
  ipc.send('notify', document.getElementById('notifyVal').value)
})