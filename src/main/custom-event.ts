import { ipcMain, dialog } from 'electron'
import { screenshot } from './screen/snapshop'
import { clearScreenDown } from 'readline'

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
			if (obj.canceled === false) {
				event.reply('selected-directory', obj.filePaths, ...args)
			}
		})
})

const createWindowEvent = (mainWindow: Electron.CrossProcessExports.BrowserWindow) => {
	ipcMain.on('window-close', function (event) {
		mainWindow.hide()
	})

	ipcMain.on('window-min', function () {
		mainWindow.minimize()
	})

	ipcMain.on('window-max', function (event) {
		mainWindow.maximize()
	})

	ipcMain.on('window-normal', function (event) {
		mainWindow.restore()
	})

	ipcMain.on('screenShop', () => {
		screenshot()
	})
}

class CustomWindowEvent {}

export default createWindowEvent
