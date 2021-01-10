const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer


/*** Window Handling      ***/
/****************************/

const closeWin = document.getElementById('closeWin')

closeWin.addEventListener('click', closeWindow)

function closeWindow() {
  var win = remote.getCurrentWindow();
  win.close()
}


/*** NOTIFY      ***/
/*******************/

const notifyBtn = document.getElementById('notifyBtn')

notifyBtn.addEventListener('click', function () {
  ipc.send('notify', document.getElementById('notifyVal').value)
  closeWindow()
})