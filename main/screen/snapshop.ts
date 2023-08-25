import { app, clipboard } from 'electron'
import { execFile } from 'child_process'
import { join } from 'path'
import { mainWindow } from '../main'
import logger from '../logger/index'

const appPath = app.getAppPath()
const clipboardParsing = () => {
	let pngs = clipboard.readImage().toDataURL() //可改变图片格式，如：toJPEG
	mainWindow.webContents.send('screenShop', pngs)
}

export const screenshot = () => {
	let exPath = join(appPath, '..', `app.asar.unpacked/exec/PrintScr.exe`)
	if (process.env.NODE_ENV === 'development') {
		exPath = join(appPath, '..', `exec/PrintScr.exe`)
	}
	logger.info(exPath)
	logger.info(process.env.NODE_ENV)

	let screen_window = execFile(exPath)
	screen_window.on('exit', code => {
		if (code) {
			clipboardParsing()
		}
	})
}
