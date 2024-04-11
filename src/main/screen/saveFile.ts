import { dialog } from 'electron'
import fs from 'fs/promises'

export const saveScreenShoot = async (blob: Buffer) => {
	const res = await dialog.showSaveDialog({
		title: '保存图片',
		defaultPath: `${+new Date()}.png`,
		filters: [{ name: 'Images', extensions: ['jpg', 'png'] }],
	})
	if (res.filePath) {
		await fs.writeFile(res.filePath, blob, 'binary')
	}
}
