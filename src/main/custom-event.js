const { ipcMain, dialog } = require('electron');

ipcMain.on('window-close', function (event, args) {
	// global.mainWindow.close();
	global.mainWindow.hide();
});

ipcMain.on('window-min', function () {
	global.mainWindow.minimize();
});

ipcMain.on('window-max', function (event, args) {
	global.mainWindow.maximize();
	// event.reply('window-max-min', 1);
	// event.sender.send('asynchronous-reply', 'pong');
});

ipcMain.on('window-normal', function (event, args) {
	global.mainWindow.restore();
	// event.reply('window-max-min', 2);
	// if (mainWindow.isMaximized()) {

	// } else {
	// 	mainWindow.maximize();
	// }
});

ipcMain.on('open-file-dialog', (event, ...args) => {
	//'openDirectory', 'openFile'
	dialog
		.showOpenDialog({
			properties: [...args],
			filters: [
				{
					name: 'Text',
					extensions: ['icode'],
				},
				{
					name: 'Custom File Type',
					extensions: ['as'],
				},
				{
					name: 'All Files',
					extensions: ['*'],
				},
			],
		})
		.then(obj => {
			event.reply('selected-directory', obj.filePaths, ...args);
		});
});
