import { app, clipboard } from 'electron'
import { execFile } from 'child_process'
import { writeFile } from 'fs'
import { join } from 'path'
import { mainWindow } from '../main'
import logger from '../logger/index'

const appPath = app.getAppPath()
const clipboardParsing = () => {
	let pngs = clipboard.readImage().toDataURL() //可改变图片格式，如：toJPEG
	// //@ts-ignore
	// let imgData = Buffer.from(pngs, 'base64')

	// let imgs =
	// 	'data:image/png;base64,' +
	// 	btoa(new Uint8Array(imgData).reduce((data, byte) => data + String.fromCharCode(byte), ''))
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
	// if (process.platform == "darwin") {
	//   //判断当前操作系统，"darwin" 是mac系统     "win32" 是window系统
	//   exec(`screencapture -i -c`, (error, stdout, stderr) => {
	//     if (!error) {
	//       clipboardParsing();
	//     }
	//   });
	// } else {

	// }
}

logger.info(appPath)
