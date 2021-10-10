const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

const glob = require('glob');

global.mainWindow = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		title: '创客',
		icon: path.join(__dirname, './image/icons/256x256.ico'),
		width: 1000,
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
			enableRemoteModule: true,
			contextIsolation: false,
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
		console.log(app.getVersion());
	});

	mainWindow.on('maximize', function (event) {
		console.log('1');
		event.sender.send('window-max-min', 1);
	});

	mainWindow.on('unmaximize', function (event) {
		console.log('2');
		event.sender.send('window-max-min', 2);
	});

	mainWindow.on('enter-full-screen', function (event) {
		event.sender.send('screen-full', 1);
	});

	mainWindow.on('leave-full-screen', function (event) {
		event.sender.send('screen-full', 2);
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

let tray = null;
app.whenReady().then(() => {
	tray = new Tray(path.join(__dirname, './image/icons/64x64.ico'));
	const contextMenu = Menu.buildFromTemplate([
		{
			label: '退出',
			click: () => {
				if (process.platform !== 'darwin') {
					app.quit();
				}
			},
		},
	]);
	tray.setToolTip('创客');
	tray.setContextMenu(contextMenu);

	tray.on('click', () => {
		global.mainWindow.show();
	});
});
