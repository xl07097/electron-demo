import { app, BrowserWindow, IpcMainInvokeEvent, globalShortcut } from 'electron'
import createTray from './tray/index'
import createWindowEvent from './custom-event'
import * as path from 'path'

let mainWindow: BrowserWindow

function createWindow() {
	mainWindow = new BrowserWindow({
		title: '创客',
		// icon: path.resolve(__dirname, '..', 'assets/icons/256x256.ico'),
		width: 1000,
		height: 600,
		minWidth: 800,
		minHeight: 600,
		show: false,
		frame: false,
		// titleBarStyle: 'hiddenInset',
		// backgroundColor: '#2e2c29',
		// transparent: true,
		// darkTheme: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInWorker: true,
			webSecurity: true,
			navigateOnDragDrop: true,
			devTools: true,
			preload: path.join(__dirname, '..', 'preload/index.js'),
		},
	})
	//
	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('http://localhost:5173')
	} else {
		mainWindow.loadFile(path.resolve(__dirname, '..', 'build/index.html'))
	}
	// mainWindow.on('closed', function () {
	// 	mainWindow = null;
	// });

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		// mainWindow.flashFrame(true);
	})

	mainWindow.on('maximize', function (event: IpcMainInvokeEvent) {
		event.sender.send('window-max-min', 1)
	})

	mainWindow.on('unmaximize', function (event: IpcMainInvokeEvent) {
		event.sender.send('window-max-min', 2)
	})

	mainWindow.on('enter-full-screen', function (event: IpcMainInvokeEvent) {
		event.sender.send('screen-full', 1)
	})

	mainWindow.on('leave-full-screen', function (event: IpcMainInvokeEvent) {
		event.sender.send('screen-full', 2)
	})
}

// function makeSingleInstance() {
// 	if (process.mas) return false;

// 	return app.requestSingleInstanceLock(() => {
// 		if (mainWindow) {
// 			if (mainWindow.isMinimized()) mainWindow.restore();
// 			mainWindow.focus();
// 		}
// 	});
// }

function initApplication() {
	// const singleInstance = makeSingleInstance();
	// console.log(singleInstance);
	// if (singleInstance) {
	// 	return app.quit();
	// }

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

	app.on('ready', () => {
		createWindow()
		createTray(mainWindow)
		createWindowEvent(mainWindow)
		import('./appUpdate/index')

		// globalShortcut.register('CommandOrControl+R', () => {
		// 	console.log('CommandOrControl')
		// })
		// console.log(globalShortcut.isRegistered('CommandOrControl+R'))

		// globalShortcut.unregister('CommandOrControl+R')
	})
}

// 初始化
initApplication()

export { mainWindow }
