import { app, BrowserWindow, IpcMainInvokeEvent } from 'electron';

import * as path from 'path';

// import glob from 'glob';

let mainWindow: BrowserWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		title: '创客',
		// icon: path.resolve(__dirname, '..', 'render/image/icons/256x256.ico'),
		width: 1000,
		height: 600,
		minWidth: 800,
		minHeight: 600,
		show: false,
		frame: false,
		titleBarStyle: 'hiddenInset',
		// backgroundColor: '#2e2c29',
		// transparent: true,
		// darkTheme: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	//
	if (process.env.NODE_ENV === 'development') {
		mainWindow.loadURL('https://www.zhiqiuge.com');
	} else {
		mainWindow.loadURL(path.resolve(__dirname, '..', 'render/index.html'));
	}
	// mainWindow.on('closed', function () {
	// 	mainWindow = null;
	// });

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		// mainWindow.flashFrame(true);
		console.log(app.getVersion());
	});

	mainWindow.on('maximize', function (event: IpcMainInvokeEvent) {
		console.log('1');
		event.sender.send('window-max-min', 1);
	});

	mainWindow.on('unmaximize', function (event: IpcMainInvokeEvent) {
		console.log('2');
		event.sender.send('window-max-min', 2);
	});

	mainWindow.on('enter-full-screen', function (event: IpcMainInvokeEvent) {
		event.sender.send('screen-full', 1);
	});

	mainWindow.on('leave-full-screen', function (event: IpcMainInvokeEvent) {
		event.sender.send('screen-full', 2);
	});
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

	// 加载主进程文件
	// loadMainProcess();

	app.on('window-all-closed', function () {
		if (process.platform !== 'darwin') {
			app.quit();
		}
	});

	app.on('activate', function () {
		if (mainWindow === null) {
			createWindow();
		}
	});

	app.on('ready', createWindow);
}

// 初始化
initApplication();

// function loadMainProcess() {
// 	// const files = glob.sync(path.join(__dirname, 'main_process/**/*.js'));
// 	// files.forEach(file => {
// 	// 	require(file);
// 	// });
// 	require('./application-menu.js');
// 	require('./appUpdate.js');
// 	require('./custom-event.js');
// }

export { mainWindow };
