import { UpdateInfo } from 'electron-updater'
import { ProgressInfo } from 'builder-util-runtime'

export function checkingForUpdate(mainWindow: Electron.BrowserWindow) {
	mainWindow.webContents.send('checking-for-update', '正在检查更新……')
}

export function updateNotAvailable(mainWindow: Electron.BrowserWindow, info: UpdateInfo) {
	mainWindow.webContents.send('update-not-available', '现在使用的就是最新版本，无需更新', info)
}

export function updateError(mainWindow: Electron.BrowserWindow, error: Error) {
	mainWindow.webContents.send('update-error', error)
}

export function updateAvailable(mainWindow: Electron.BrowserWindow, info: UpdateInfo) {
	mainWindow.webContents.send('update-available', '检测到新版本，是否更新……', info)
}

export function downloadUpdate(mainWindow: Electron.BrowserWindow, info: UpdateInfo) {
	console.log('下载更新***************')
	mainWindow.webContents.send('download-update', '下载更新')
}

export function downloadProgress(mainWindow: Electron.BrowserWindow, progressObj: ProgressInfo) {
	console.log('下载更新==================')
	mainWindow.webContents.send('download-progress', progressObj)
}

export function updateDownloaded(mainWindow: Electron.BrowserWindow) {
	mainWindow.webContents.send('update-downloaded')
}
