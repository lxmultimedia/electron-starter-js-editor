const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeWin = document.getElementById('closeWin')

closeWin.addEventListener('click', function (event) {
  var win = remote.getCurrentWindow();
  win.close()
})