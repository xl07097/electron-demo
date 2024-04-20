/**
 * @author xueliang
 * @date 2021-10-09
 * @update
 * 数据验证工具库
 */

export default class Validate {
	constructor() {}

	static isEmpty(value: any) {
		return value === null || value === void 0 || value === ''
	}

	static isUndefined(value: undefined) {
		return typeof value === 'undefined'
	}

	static isNumber(value: number) {
		return typeof value === 'number'
	}

	static isMobile(value: string) {
		return /^1[3456789]\d{9}$/.test(value)
	}

	static isIdCard(value: string) {
		return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
	}

	static isExcel(name: string) {
		return /(\.xls|\.xlsx)$/.test(name.toLowerCase())
	}

	static isImage(name: string) {
		return /(\.jpg|\.jpeg|\.png)$/.test(name.toLowerCase())
	}

	static isOutLimit(size: number, limit: number) {
		return size > limit * 1024 * 1024
	}

	static isOutTimeInteval(end: string, start: string, limit: number) {
		return new Date(end).getTime() - new Date(start).getTime() > limit * 1000 * 24 * 60 * 60
	}

	static fileChanged(file: File) {
		return new Promise((resolve, reject) => {
			file
				.slice(0, 1) // only the first byte
				.arrayBuffer() // try to read
				.then(resolve)
				.catch(() => {
					// showToast('文件已经改动，不能上传，请重新选择', '提示', 'warning')
					reject()
				})
		})
	}
}
