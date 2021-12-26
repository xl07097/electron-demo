import { ipcMain } from 'electron'
import { NsisUpdater } from 'electron-updater'
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

// autoUpdater.autoDownload = false;

let autoUpdater = new NsisUpdater()

autoUpdater.on('checking-for-update', function (info) {
	log.info(info)
	checkingForUpdate(info)
})

autoUpdater.on('update-not-available', function (info) {
	log.info(info)
	updateNotAvailable(info)
})

autoUpdater.on('error', function (error) {
	log.error(error)
	updateError(error)
})

autoUpdater.on('update-available', function (info) {
	log.info(info)
	updateAvailable(info)
})

// 更新下载进度事件
autoUpdater.on('download-progress', function (progressObj) {
	log.info('触发下载。。。')
	downloadProgress(progressObj)
})

autoUpdater.on('update-downloaded', function () {
	log.info('下载完成。。。')
	ipcMain.once('isUpdateNow', () => {
		log.info('开始更新。。。')
		autoUpdater.quitAndInstall()
	})
	updateDownloaded()
})

// 监听是否下载新版本事件
ipcMain.on('downloadUpdate', () => {
	log.info('执行下载')
	autoUpdater.downloadUpdate()
	// mainWindow.webContents.send('downloadUpdate', 'downloadUpdate');
})

// 监听是否检查更新事件
ipcMain.on('checkForUpdate', () => {
	// 执行自动更新检查
	log.info('执行自动更新检查')
	//清除每次更新下载的文件，否则无法进行更新
	// let updaterCacheDirName = 'note-updater'
	// const updatePendingPath = path.join(autoUpdater.app.baseCachePath, updaterCacheDirName, 'pending')
	// log.warn(updatePendingPath)
	// rm(updatePendingPath, function (err) {
	//   log.warn(autoUpdater.app.baseCachePath)
	// })

	autoUpdater.checkForUpdates()
})

export function checkForUpdate() {
	// if (process.env.NODE_ENV === 'development') {
	// 	return;
	// }

	autoUpdater.checkForUpdates()
}

export default autoUpdater
