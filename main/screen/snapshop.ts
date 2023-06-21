import { clipboard } from 'electron'
import { execFile } from 'child_process'
import { writeFile } from 'fs'
import { join } from 'path'

// const appPath = app.getAppPath()
const clipboardParsing = () => {
	let pngs = clipboard.readImage().toPNG() //可改变图片格式，如：toJPEG
	//@ts-ignore
	let imgData = Buffer.from(pngs, 'base64')

	writeFile('./lp.png', imgData, err => {})

	// let imgs =
	// 	'data:image/png;base64,' +
	// 	btoa(new Uint8Array(imgData).reduce((data, byte) => data + String.fromCharCode(byte), ''))
}

export const screenshot = () => {
	const exPath = join(__dirname, `../../exec/PrintScr.exe`)
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
