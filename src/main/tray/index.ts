import { app, Tray, Menu, BrowserWindow } from 'electron'
import * as path from 'path'

// 使用原生方法获取活动窗口
const getActiveWindow = () => {
	const windows = BrowserWindow.getAllWindows()
	const activeWindow = windows.find((window: Electron.CrossProcessExports.BrowserWindow) => {
		return window.isFocused()
	})
	return activeWindow
}

class TrayClass {
	static init() {
		app.whenReady().then(() => {
			let tray = new Tray(path.join(__dirname, '..', '..', 'assets/icons/64x64.ico'))
			const contextMenu = Menu.buildFromTemplate([
				{
					label: '退出',
					click: () => {
						if (process.platform !== 'darwin') {
							app.quit()
						}
					},
				},
			])
			tray.setToolTip('创客')
			tray.setContextMenu(contextMenu)

			tray.on('click', () => {
				const mainWindow = getActiveWindow()
				mainWindow.show()
			})
		})
	}
}

export { TrayClass }
