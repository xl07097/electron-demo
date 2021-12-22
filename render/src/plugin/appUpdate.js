const { ipcRenderer } = require('electron')

ipcRenderer.on('error', function (event, args) {
	console.log(args)
})
ipcRenderer.on('update', function (event, args) {
	console.log(args)
})
ipcRenderer.on('available', function (event, args) {
	console.log(args)
	ipcRenderer.send('downloadUpdate')
})
ipcRenderer.on('not-available', function (event, args) {
	console.log(args)
})
ipcRenderer.on('downloadProgress', function (event, args) {
	console.log(args)
})
ipcRenderer.on('isUpdateNow', function (event, args) {
	console.log(args)
	ipcRenderer.send('isUpdateNow')
})
ipcRenderer.on('checkForUpdate', function (event, args) {
	console.log(args)
})
ipcRenderer.on('downloadUpdate', function (event, args) {
	console.log(args)
})
ipcRenderer.send('checkForUpdate')

console.log(909)
