/**
 * @author xueliang
 * @date 2021-10-09
 * @update
 * 数据验证工具库
 */

export default class Validate {
	constructor() {}

	static isEmpty(value) {
		return value === null || value === void 0 || value === ''
	}

	static isUndefined(value) {
		return typeof value === 'undefined'
	}

	static isNumber(value) {
		return typeof value === 'number'
	}

	static isMobile(value) {
		return /^1[3456789]\d{9}$/.test(value)
	}

	static isIdCard(value) {
		return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
	}

	static isExcel(name) {
		return /(\.xls|\.xlsx)$/.test(name.toLowerCase())
	}

	static isImage(name) {
		return /(\.jpg|\.jpeg|\.png)$/.test(name.toLowerCase())
	}

	static isOutLimit(size, limit) {
		return size > limit * 1024 * 1024
	}

	static isOutTimeInteval(end, start, limit) {
		return new Date(end).getTime() - new Date(start).getTime() > limit * 1000 * 24 * 60 * 60
	}

	static fileChanged(file) {
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

	static idCardValid(code) {
		var city = {
			11: '北京',
			12: '天津',
			13: '河北',
			14: '山西',
			15: '内蒙古',
			21: '辽宁',
			22: '吉林',
			23: '黑龙江 ',
			31: '上海',
			32: '江苏',
			33: '浙江',
			34: '安徽',
			35: '福建',
			36: '江西',
			37: '山东',
			41: '河南',
			42: '湖北 ',
			43: '湖南',
			44: '广东',
			45: '广西',
			46: '海南',
			50: '重庆',
			51: '四川',
			52: '贵州',
			53: '云南',
			54: '西藏 ',
			61: '陕西',
			62: '甘肃',
			63: '青海',
			64: '宁夏',
			65: '新疆',
			71: '台湾',
			81: '香港',
			82: '澳门',
			91: '国外 ',
		}
		var tip = ''
		var pass = true

		if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
			tip = '身份证号格式错误'
			pass = false
		} else if (!city[code.substr(0, 2)]) {
			tip = '地址编码错误'
			pass = false
		} else {
			//18位身份证需要验证最后一位校验位
			if (code.length == 18) {
				code = code.split('')
				//∑(ai×Wi)(mod 11)
				//加权因子
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
				//校验位
				var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
				var sum = 0
				var ai = 0
				var wi = 0
				for (var i = 0; i < 17; i++) {
					ai = code[i]
					wi = factor[i]
					sum += ai * wi
				}
				var last = parity[sum % 11]
				if (parity[sum % 11] != code[17]) {
					tip = '身份证号校验位错误'
					pass = false
				}
			}
		}
		// if (!pass) alert(tip)
		return tip
	}
}
