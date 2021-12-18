import { mainWindow } from '../main';
import { UpdateInfo } from 'electron-updater';
import { ProgressInfo } from 'builder-util-runtime';

export function checkingForUpdate(info: UpdateInfo) {
	mainWindow.webContents.send('checking-for-update', '正在检查更新……', info);
}

export function updateNotAvailable(info: UpdateInfo) {
	mainWindow.webContents.send('update-not-available', '现在使用的就是最新版本，无需更新', info);
}

export function updateError(error: UpdateInfo) {
	mainWindow.webContents.send('update-error', error);
}

export function updateAvailable(info: UpdateInfo) {
	mainWindow.webContents.send('update-available', '检测到新版本，是否更新……', info);
}

export function downloadProgress(progressObj: ProgressInfo) {
	mainWindow.webContents.send('download-progress', progressObj);
}

export function updateDownloaded() {
		mainWindow.webContents.send('update-downloaded');
}
