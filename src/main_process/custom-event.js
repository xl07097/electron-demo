const { ipcMain, dialog } = require('electron');

ipcMain.on('window-close', function (event, args) {
	global.mainWindow.close();
});

ipcMain.on('window-min', function () {
	global.mainWindow.minimize();
});

ipcMain.on('window-max', function (event, args) {
	global.mainWindow.maximize();
	event.reply('window-max-min', 1);
	// event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('window-normal', function (event, args) {
	global.mainWindow.restore();
	event.reply('window-max-min', 2);
	// if (mainWindow.isMaximized()) {

	// } else {
	// 	mainWindow.maximize();
	// }
});

ipcMain.on('open-file-dialog', event => {
	dialog
		.showOpenDialog({
			properties: ['openFile', 'openDirectory'],
		})
		.then(obj => {
			event.reply('selected-directory', obj.filePaths);
		});
});
