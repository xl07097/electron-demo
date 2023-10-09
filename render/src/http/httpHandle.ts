import { AxiosResponse } from 'axios'

import { getExportName, saveFile } from './saveFile'
import type { IResData, IConfig } from '@/interface/login'

// 响应状态码 弹框处理
export const responseHandle = ({ code, msg }: IResData) => {
	switch (code) {
		case 300:
			// showMessage(message);
			break
		case 500:
			// showMessage(message);
			break
		default:
			break
	}
}

// 下载文件流处理
export const downloadHandle = async (res: AxiosResponse) => {
	try {
		const text = await res.data.text()
		responseHandle(text)
		return text
	} catch (error) {
		const filename = getExportName(res)
		saveFile(res.data, filename)
		return {
			code: 200,
			message: '导出成功',
		}
	}
}
