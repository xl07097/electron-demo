import { ipcMain } from 'electron';
import { autoUpdater, ProgressInfo, UpdateInfo } from 'electron-updater';
import electronUpdater, { type AppUpdater } from 'electron-updater';
import {
	checkingForUpdate,
	updateNotAvailable,
	updateError,
	updateAvailable,
	downloadProgress,
	updateDownloaded,
} from './sendUpdateInfo';

import logger from '../logger/index';
import { AppWindow } from '../AppWindow';

const autoUpdaterWithEvents = autoUpdater as typeof autoUpdater & NodeJS.EventEmitter;
autoUpdater.autoDownload = false;
class AppUpdateEvent {
	private window: Electron.BrowserWindow;

	constructor(mainWindow: AppWindow) {
		this.window = mainWindow.window;
		const updater = this.getAutoUpdater();
		autoUpdaterWithEvents.on('checking-for-update', this.checkingForUpdate.bind(this));
		autoUpdaterWithEvents.on('update-not-available', this.updateNotAvailable.bind(this));
		autoUpdaterWithEvents.on('error', this.updateError.bind(this));
		autoUpdaterWithEvents.on('update-available', this.updateAvailable.bind(this));
		autoUpdaterWithEvents.on('download-progress', this.downloadProgress.bind(this));
		autoUpdaterWithEvents.on('update-downloaded', this.updateDownloaded.bind(this));
		// 监听是否下载新版本事件
		ipcMain.on('downloadUpdate', this.downloadUpdate.bind(this));
		// 监听是否检查更新事件
		ipcMain.on('checkForUpdate', this.checkForUpdates.bind(this));
	}

	getAutoUpdater(): AppUpdater {
		// Using destructuring to access autoUpdater due to the CommonJS module of 'electron-updater'.
		// It is a workaround for ESM compatibility issues, see https://github.com/electron-userland/electron-builder/issues/7976.
		const { autoUpdater } = electronUpdater;
		return autoUpdater;
	}

	checkingForUpdate() {
		checkingForUpdate(this.window);
	}

	updateNotAvailable(info: UpdateInfo) {
		logger.info(info);
		updateNotAvailable(this.window, info);
	}

	updateError(error: Error) {
		logger.error(error);
		updateError(this.window, error);
	}

	updateAvailable(info: UpdateInfo) {
		logger.info(info);
		updateAvailable(this.window, info);
	}

	downloadProgress(progressObj: ProgressInfo) {
		logger.info('触发下载。。。');
		downloadProgress(this.window, progressObj);
	}

	updateDownloaded() {
		logger.info('下载完成。。。');
		ipcMain.once('install-now', () => {
			logger.info('开始更新。。。');
			autoUpdater.quitAndInstall();
		});
		updateDownloaded(this.window);
	}

	downloadUpdate() {
		logger.info('执行下载');
		autoUpdater.downloadUpdate();
	}

	checkForUpdates() {
		logger.info('执行自动更新检查');
		autoUpdater.checkForUpdates();
	}
}

export function registerUpdateEvent(MainWindow: AppWindow) {
	new AppUpdateEvent(MainWindow);
}
