import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { screenshot } from './screen/snapshop'
import { ElectronWindownStatus } from './enum/ElectronWindow'
import logger from './logger/index'

class WindowEvent {
	constructor() {}

	async bindEvent(mainWindow: Electron.BrowserWindow) {
		mainWindow.on('maximize', () => {
			logger.info('maximize:')
			mainWindow.webContents.send('window-max-min', ElectronWindownStatus.minimize)
		})

		mainWindow.on('unmaximize', () => {
			logger.info('unmaximize:')
			mainWindow.webContents.send('window-max-min', ElectronWindownStatus.maximize)
		})

		mainWindow.on('enter-full-screen', () => {
			mainWindow.webContents.send('screen-full', ElectronWindownStatus.minimize)
		})

		mainWindow.on('leave-full-screen', () => {
			mainWindow.webContents.send('screen-full', ElectronWindownStatus.maximize)
		})

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
