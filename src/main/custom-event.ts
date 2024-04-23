import { ipcMain } from 'electron'
import { screenshot } from './screen/snapshop'

class WindowEvent {
	async bindEvent(mainWindow: Electron.BrowserWindow) {
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
			screenshot(mainWindow)
		})
	}
}

const windowEvent = new WindowEvent()

export { windowEvent }
