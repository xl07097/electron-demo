import { ipcMain, dialog } from 'electron'

ipcMain.on('open-file-dialog', (event, ...args) => {
	//'openDirectory', 'openFile'
	dialog
		.showOpenDialog({
			properties: [...args],
			filters: [
				{
					name: 'All Files',
					extensions: ['*'],
				},
			],
		})
		.then(obj => {
			event.reply('selected-directory', obj.filePaths, ...args)
		})
})

const createWindowEvent = mainWindow => {
	ipcMain.on('window-close', function (event, args) {
		mainWindow.hide()
	})

	ipcMain.on('window-min', function () {
		mainWindow.minimize()
	})

	ipcMain.on('window-max', function (event, args) {
		mainWindow.maximize()
	})

	ipcMain.on('window-normal', function (event, args) {
		mainWindow.restore()
	})
}

export default createWindowEvent
