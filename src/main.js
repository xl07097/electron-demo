require('update-electron-app')({
	logger: require('electron-log'),
});

const { app, BrowserWindow, ipcMain } = require('electron');

const glob = require('glob');
const path = require('path');

let mainWindow = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		title: '创客',
		width: 800,
		height: 600,
		minWidth: 800,
		minHeight: 600,
		show: false,
		frame: false,
		backgroundColor: '#2e2c29',
		// transparent: true,
		// darkTheme: true,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	// mainWindow.loadURL('http://localhost:9830/login')
	mainWindow.loadURL(`file://${__dirname}/index.html`);
	mainWindow.on('closed', function () {
		mainWindow = null;
	});

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		// mainWindow.flashFrame(true);
	});
}

function makeSingleInstance() {
	if (process.mas) return false;

	return app.requestSingleInstanceLock(() => {
		if (mainWindow) {
			if (mainWindow.isMinimized()) mainWindow.restore();
			mainWindow.focus();
		}
	});
}

function initApplication() {
	// const singleInstance = makeSingleInstance();
	// console.log(singleInstance);
	// if (singleInstance) {
	// 	return app.quit();
	// }

	// 加载主进程文件
	loadMainProcess();

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

function loadMainProcess() {
	const files = glob.sync(path.join(__dirname, 'main_process/**/*.js'));
	files.forEach(file => {
		require(file);
	});
}

ipcMain.on('window-min', function () {
	mainWindow.minimize();
});

ipcMain.on('window-max', function (event, args) {
	mainWindow.maximize();
	event.reply('window-max-min', 1);
	// event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('window-normal', function (event, args) {
	mainWindow.restore();
	event.reply('window-max-min', 2);
	// if (mainWindow.isMaximized()) {

	// } else {
	// 	mainWindow.maximize();
	// }
});
