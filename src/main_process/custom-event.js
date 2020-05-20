const { ipcMain, app, dialog } = require('electron');

ipcMain.on('window-close', function (event, args) {
	app.quit();
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
