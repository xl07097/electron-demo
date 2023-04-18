import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import {
	checkingForUpdate,
	updateNotAvailable,
	updateError,
	updateAvailable,
	downloadProgress,
	updateDownloaded,
} from './sendUpdateInfo'

log.transports.console.level = false
log.transports.console.level = 'silly'

autoUpdater.autoDownload = false

autoUpdater.on('checking-for-update', () => {
	checkingForUpdate()
})

autoUpdater.on('update-not-available', info => {
	log.info(info)
	updateNotAvailable(info)
})

autoUpdater.on('error', error => {
	log.error(error)
	updateError(error)
})

autoUpdater.on('update-available', info => {
	log.info(info)
	updateAvailable(info)
})

// 更新下载进度事件
autoUpdater.on('download-progress', progressObj => {
	log.info('触发下载。。。')
	downloadProgress(progressObj)
})

autoUpdater.on('update-downloaded', () => {
	log.info('下载完成。。。')
	ipcMain.once('install-now', () => {
		log.info('开始更新。。。')
		autoUpdater.quitAndInstall()
	})
	updateDownloaded()
})

// 监听是否下载新版本事件
ipcMain.on('downloadUpdate', () => {
	log.info('执行下载')
	autoUpdater.downloadUpdate()
})

// 监听是否检查更新事件
ipcMain.on('checkForUpdate', () => {
	log.info('执行自动更新检查')

	autoUpdater.checkForUpdates()
})

export default autoUpdater
