import { app, BrowserWindow, IpcMainInvokeEvent } from 'electron'
import * as path from 'path'
import { appUpdateEvent } from './appUpdate/index'
import { appTray } from './tray/index'
import { windowEvent } from './windowEvent'
import logger from './logger/index'

class MainWindow {
	mainWindow: BrowserWindow
	async createWindow() {
		this.mainWindow = new BrowserWindow({
			title: '创客',
			width: 1000,
			height: 600,
			minWidth: 800,
			minHeight: 600,
			show: false,
			frame: false,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
				nodeIntegrationInWorker: true,
				webSecurity: true,
				navigateOnDragDrop: true,
				devTools: true,
				preload: path.join(__dirname, '..', 'src/preload/index.js'),
			},
		})
		//
		if (process.env.NODE_ENV === 'development') {
			this.mainWindow.loadURL('http://localhost:5173')
		} else {
			this.mainWindow.loadFile(path.resolve(__dirname, '..', 'build/index.html'))
		}

		this.mainWindow.once('ready-to-show', () => {
			this.mainWindow.show()
		})

		this.mainWindow.on('maximize', (event: IpcMainInvokeEvent) => {
			logger.info('maximize:')
			this.mainWindow.webContents.send('window-max-min', 1)
		})

		this.mainWindow.on('unmaximize', (event: IpcMainInvokeEvent) => {
			logger.info('unmaximize:')
			this.mainWindow.webContents.send('window-max-min', 2)
		})

		this.mainWindow.on('enter-full-screen', (event: IpcMainInvokeEvent) => {
			this.mainWindow.webContents.send('screen-full', 1)
		})

		this.mainWindow.on('leave-full-screen', (event: IpcMainInvokeEvent) => {
			this.mainWindow.webContents.send('screen-full', 2)
		})
	}

	async makeSingleInstance() {
		if (process.mas) return false
		const gotTheLock = app.requestSingleInstanceLock()
		if (!gotTheLock) {
			app.quit()
			this.showWindow()
			return gotTheLock
		}
		app.on('second-instance', (event, commandLine, workingDirectory) => {
			this.showWindow()
		})
		return gotTheLock
	}

	async showWindow() {
		if (this.mainWindow) {
			if (!this.mainWindow.isVisible()) {
				this.mainWindow.show()
			} else if (this.mainWindow.isMinimized()) {
				this.mainWindow.restore()
			}
			this.mainWindow.focus()
		}
	}

	async init() {
		const gotTheLock = this.makeSingleInstance()
		if (!gotTheLock) {
			return
		}

		app.on('window-all-closed', function () {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		})

		app.on('activate', () => {
			if (this.mainWindow === null) {
				this.createWindow()
			}
		})

		app.on('ready', async () => {
			this.createWindow()
			appTray.create(this.mainWindow)
			windowEvent.bindEvent(this.mainWindow)
			appUpdateEvent.bindEvent(this.mainWindow)
		})
	}

	async launchApp() {
		this.init()
	}
}

const bootstrap = new MainWindow()

bootstrap.launchApp()

export { bootstrap }
