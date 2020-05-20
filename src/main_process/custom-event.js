const { ipcMain, app } = require('electron');

ipcMain.on('window-close', function (event, args) {
	app.quit();
});

