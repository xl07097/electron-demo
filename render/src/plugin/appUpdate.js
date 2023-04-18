const { ipcRenderer } = require('electron')
import { message } from 'antd'

import events from '@/utils/event'
import store from '@/store/store'
import { setProgress, setStatus } from '@/store/modules/update'

// 更新错误
ipcRenderer.on('update-error', function (event, args) {
	events.emit('update-error', args)
})

// 正在检查更新……
ipcRenderer.on('checking-for-update', function (event) {
	events.emit('checking-for-update')
})

// 检测到新版本，是否更新……
ipcRenderer.on('update-available', function (event, args) {
	store.dispatch(setStatus(UpdateStatus.DOWNLOADINGUPDATE))
	ipcRenderer.send('downloadUpdate')
})

// 现在使用的就是最新版本，无需更新
ipcRenderer.on('update-not-available', function (event, args) {
	message.info('最新版本，不用更新')
	store.dispatch(setStatus(UpdateStatus.NOUPDATE))
})

// 开始更新
ipcRenderer.on('download-update', function (event, args) {
	events.emit('download-update', args)
})

// 下载进度
ipcRenderer.on('download-progress', function (event, args) {
	store.dispatch(setProgress(Math.floor(args.percent)))
})

// 下载完成
ipcRenderer.on('update-downloaded', function (event, args) {
	store.dispatch(setStatus(UpdateStatus.DOWNLOADEDUPDATE))
})

// 检查更新
ipcRenderer.on('checkForUpdate', function (event, args) {
	events.emit('checkForUpdate', args)
})
