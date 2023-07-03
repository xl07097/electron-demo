import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'

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

autoUpdater.on('checking-for-update', () => {
	checkingForUpdate()
})

autoUpdater.on('update-not-available', info => {
	logger.info(info)
	updateNotAvailable(info)
})

autoUpdater.on('error', error => {
	logger.error(error)
	updateError(error)
})

autoUpdater.on('update-available', info => {
	logger.info(info)
	updateAvailable(info)
})

// 更新下载进度事件
autoUpdater.on('download-progress', progressObj => {
	logger.info('触发下载。。。')
	downloadProgress(progressObj)
})

autoUpdater.on('update-downloaded', () => {
	logger.info('下载完成。。。')
	ipcMain.once('install-now', () => {
		logger.info('开始更新。。。')
		autoUpdater.quitAndInstall()
	})
	updateDownloaded()
})

// 监听是否下载新版本事件
ipcMain.on('downloadUpdate', () => {
	logger.info('执行下载')
	autoUpdater.downloadUpdate()
})

// 监听是否检查更新事件
ipcMain.on('checkForUpdate', () => {
	logger.info('执行自动更新检查')

	autoUpdater.checkForUpdates()
})

export default autoUpdater
