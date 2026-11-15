import { app, Tray, Menu } from 'electron';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AppTray {
	constructor() {}

	create(mainWindow: Electron.BrowserWindow) {
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
	}
}

export function createTray(mainWindow: Electron.BrowserWindow) {
	const tray = new AppTray();
	tray.create(mainWindow);
}
