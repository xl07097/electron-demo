import { Tray, Menu } from 'electron';
import * as path from 'node:path';
import { AppWindow } from '../AppWindow';

class AppTray {
	constructor() {}

	create(mainWindow: AppWindow) {
		let tray;
		if (process.env.NODE_ENV === 'development') {
			tray = new Tray(
				path.join(__dirname, '..', '..', '..', '..', 'buildResources/icons/64x64.ico')
			);
		} else {
			tray = new Tray(path.join(__dirname, 'buildResources/icons/64x64.ico'));
		}

		const contextMenu = Menu.buildFromTemplate([
			{
				label: '退出',
				click: () => {
					if (process.platform !== 'darwin') {
						mainWindow.quit();
					}
				},
			},
		]);
		tray.setToolTip('创客');
		tray.setContextMenu(contextMenu);

		tray.on('click', () => {
			mainWindow.show();
		});
	}
}

export function createTray(mainWindow: AppWindow) {
	const tray = new AppTray();
	tray.create(mainWindow);
}
