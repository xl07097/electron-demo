import { ipcMain } from 'electron'
import { autoUpdater, ProgressInfo, UpdateInfo } from 'electron-updater'
import {
	checkingForUpdate,
	updateNotAvailable,
	updateError,
	updateAvailable,
	downloadProgress,
	updateDownloaded,
} from './sendUpdateInfo'

import logger from '../logger/index'
autoUpdater.autoDownload = false
class AppUpdateEvent {
	private mainWindow: Electron.BrowserWindow

	constructor() {}

	bindEvent(mainWindow: Electron.BrowserWindow) {
		this.mainWindow = mainWindow
		autoUpdater.on('checking-for-update', this.checkingForUpdate)
		autoUpdater.on('update-not-available', this.updateNotAvailable)
		autoUpdater.on('error', this.updateError)
		autoUpdater.on('update-available', this.updateAvailable)
		autoUpdater.on('download-progress', this.downloadProgress)
		autoUpdater.on('update-downloaded', this.updateDownloaded)
		// 监听是否下载新版本事件
		ipcMain.on('downloadUpdate', this.downloadUpdate)
		// 监听是否检查更新事件
		ipcMain.on('checkForUpdate', this.checkForUpdates)
	}

	checkingForUpdate() {
		checkingForUpdate(this.mainWindow)
	}

	updateNotAvailable(info: UpdateInfo) {
		logger.info(info)
		updateNotAvailable(this.mainWindow, info)
	}

	updateError(error: Error) {
		logger.error(error)
		updateError(this.mainWindow, error)
	}

	updateAvailable(info: UpdateInfo) {
		logger.info(info)
		updateAvailable(this.mainWindow, info)
	}

	downloadProgress(progressObj: ProgressInfo) {
		logger.info('触发下载。。。')
		downloadProgress(this.mainWindow, progressObj)
	}

	updateDownloaded() {
		logger.info('下载完成。。。')
		ipcMain.once('install-now', () => {
			logger.info('开始更新。。。')
			autoUpdater.quitAndInstall()
		})
		updateDownloaded(this.mainWindow)
	}

	downloadUpdate() {
		logger.info('执行下载')
		autoUpdater.downloadUpdate()
	}

	checkForUpdates() {
		logger.info('执行自动更新检查')
		autoUpdater.checkForUpdates()
	}
}

const appUpdateEvent = new AppUpdateEvent()

export { appUpdateEvent }
