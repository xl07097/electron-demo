import { app, Tray, Menu } from 'electron';
import { mainWindow } from '../main';
// import * as path from 'path';
const ico = require('./64x64.ico');

let tray = null;
app.whenReady().then(() => {
	tray = new Tray(ico);
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
		mainWindow.show();
	});
});
