require('update-electron-app')({
	logger: require('electron-log'),
});

const { app, BrowserWindow } = require('electron');

const glob = require('glob');
const path = require('path');

let mainWindow = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		// minWidth: 800,
		// minHeight: 600,
		frame: false,
		// backgroundColor: '#000000',
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

	require('devtron').install();
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
	const singleInstance = makeSingleInstance();
	console.log(singleInstance);
	// if (singleInstance) {
	// 	return app.quit();
	// }

	// 加载主进程文件
	loadMainProcess();

	app.on('ready', createWindow);

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
}

// 初始化
initApplication();

function loadMainProcess() {
	// const files = glob.sync(path.join(__dirname, 'main_process/**/*.js'));
	// files.forEach(file => {
	// 	require(file);
	// });
}
