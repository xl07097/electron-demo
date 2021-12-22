import { app, Tray, Menu } from 'electron'
import * as path from 'path'

const createTray = mainWindow => {
	let tray = null
	app.whenReady().then(() => {
		tray = new Tray(path.join(__dirname, '..', '..', 'assets/icons/64x64.ico'))
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
			mainWindow.show()
		})
	})
}

export default createTray
