import { app, BrowserWindow, IpcMainInvokeEvent, globalShortcut, session } from 'electron'
import createTray from './tray/index'
import createWindowEvent from './custom-event'
import * as path from 'path'
import logger from './logger/index'

let mainWindow: BrowserWindow

function createWindow() {
	mainWindow = new BrowserWindow({
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
		mainWindow.loadURL('http://localhost:5173')
	} else {
		mainWindow.loadFile(path.resolve(__dirname, '..', 'build/index.html'))
	}

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.on('maximize', function (event: IpcMainInvokeEvent) {
		logger.info('maximize:')
		mainWindow.webContents.send('window-max-min', 1)
	})

	mainWindow.on('unmaximize', function (event: IpcMainInvokeEvent) {
		logger.info('unmaximize:')
		mainWindow.webContents.send('window-max-min', 2)
	})

	mainWindow.on('enter-full-screen', function (event: IpcMainInvokeEvent) {
		mainWindow.webContents.send('screen-full', 1)
	})

	mainWindow.on('leave-full-screen', function (event: IpcMainInvokeEvent) {
		mainWindow.webContents.send('screen-full', 2)
	})
}

function makeSingleInstance() {
	if (process.mas) return false
	const gotTheLock = app.requestSingleInstanceLock()
	if (!gotTheLock) {
		app.quit()
		showWindow()
		return gotTheLock
	}
	app.on('second-instance', (event, commandLine, workingDirectory) => {
		showWindow()
	})
	return gotTheLock
}

const showWindow = () => {
	if (mainWindow) {
		if (!mainWindow.isVisible()) {
			mainWindow.show()
		} else if (mainWindow.isMinimized()) {
			mainWindow.restore()
		}
		mainWindow.focus()
	}
}

function initApplication() {
	const gotTheLock = makeSingleInstance()
	if (!gotTheLock) {
		return
	}

	app.on('window-all-closed', function () {
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

	app.on('activate', function () {
		if (mainWindow === null) {
			createWindow()
		}
	})

	app.on('ready', async () => {
		createWindow()
		createTray(mainWindow)
		createWindowEvent(mainWindow)
		import('./appUpdate/index')

		// globalShortcut.register('CommandOrControl+R', () => {
		// 	console.log('CommandOrControl')
		// })
		// console.log(globalShortcut.isRegistered('CommandOrControl+R'))

		// globalShortcut.unregister('CommandOrControl+R')
		if (process.env.NODE_ENV === 'production') {
			globalShortcut.unregister('CommandOrControl+R')
		} else {
			// try {
			// 	await session.defaultSession.loadExtension(
			// 		'C:\\Users\\ghy\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Extensions\\gpphkfbcpidddadnkolkpfckpihlkkil\\4.27.8_0',
			// 		// 打开本地文件也应用拓展
			// 		{ allowFileAccess: true }
			// 	)
			// } catch (e) {}
			// try {
			// 	await session.defaultSession.loadExtension(
			// 		'C:\\Users\\ghy\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\lmhkpmbekcpmknklioeibfkpmmfibljd\\3.0.19_0',
			// 		// 打开本地文件也应用拓展
			// 		{ allowFileAccess: true }
			// 	)
			// } catch (e) {}
		}
	})
}

// 初始化
initApplication()

export { mainWindow }
