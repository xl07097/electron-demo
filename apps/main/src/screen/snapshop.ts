import { app, ipcMain, clipboard } from 'electron';
import { execFile } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import logger from '../logger/index';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const screenshot = (mainWindow: Electron.BrowserWindow) => {
	let exPath;
	if (process.env.NODE_ENV === 'development') {
		exPath = path.join(__dirname, '..', '..', '..', '..', `buildResources/exec/PrintScr.exe`);
	} else {
		exPath = path.join(__dirname, `buildResources/exec/PrintScr.exe`);
	}
	logger.info(exPath);
	logger.info(process.env.NODE_ENV);

	let screen_window = execFile(exPath);
	screen_window.on('exit', async code => {
		if (code) {
			const type = 'image/png';
			const items = await clipboard.read();
			for (const item of items) {
				console.log(item.types);
				if (item.types.includes(type)) {
					const data: Blob = await item.getType(type);
					console.log(data);
					const arrayBuffer = await data.arrayBuffer();
					const base64 = Buffer.from(arrayBuffer).toString('base64');

					mainWindow.webContents.send('screenShop', { type, data: base64 });
				}
			}
		}
	});
};

export function registerscreenShop(mainWindow: Electron.BrowserWindow) {
	ipcMain.on('screenShop', () => {
		screenshot(mainWindow);
	});
}
