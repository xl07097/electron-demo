const { ipcRenderer } = require('electron')
import events from '@/utils/event'

// 更新错误
ipcRenderer.on('update-error', function (event, args) {
	events.emit('update-error', args)
})

// 正在检查更新……
ipcRenderer.on('checking-for-update', function (event, args) {
	events.emit('checking-for-update', args)
})

// 检测到新版本，是否更新……
ipcRenderer.on('update-available', function (event, args) {
	events.emit('update-available', args)
	ipcRenderer.send('downloadUpdate')
})

// 现在使用的就是最新版本，无需更新
ipcRenderer.on('update-not-available', function (event, args) {
	events.emit('update-not-available', args)
})

// 开始更新
ipcRenderer.on('download-update', function (event, args) {
	events.emit('download-update', args)
})

// 下载进度
ipcRenderer.on('download-progress', function (event, args) {
	events.emit('download-progress', args)
})

// 下载完成
ipcRenderer.on('update-downloaded', function (event, args) {
	events.emit('update-downloaded', args)
	// ipcRenderer.send('isUpdateNow')
})

// 检查更新
ipcRenderer.on('checkForUpdate', function (event, args) {
	events.emit('checkForUpdate', args)
})
