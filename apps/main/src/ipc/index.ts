import { app, ipcMain, BrowserWindow } from 'electron';

ipcMain.handle('app:get-version', () => {
	return app.getVersion();
});

ipcMain.handle('app:open-devtools', event => {
	const win = BrowserWindow.fromWebContents(event.sender);

	win?.webContents.openDevTools();

	return true;
});
