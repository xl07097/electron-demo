/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中： 
                i----表示号码字符从由至左包括校验码在内的位置序号； 
                ai----表示第i位置上的号码字符值； 
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
export function IdentityCodeValid(code) {
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

//驾驶证验证
function DriverCodeValid(code) {
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
		tip = '驾驶证号格式错误'
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
				tip = '校验位错误'
				pass = false
			}
		}
	}
	if (!pass) alert(tip)
	return pass
}

//邮政编码合法性验证
//目前只检测是否6位数字，首位数字为1~9，不可为0
//待后期继续完善
function ZipCodeValid(code) {
	var regex = /^[1-9]\d{5}$/
	var tip = ''
	var pass = true

	if (!regex.test(code)) {
		tip = '邮政编码格式错误！'
		pass = false
	}

	if (!pass) alert(tip)
	return pass
}

//电话号码合法性验证
function TelephoneValid(code) {
	var regex = /^((13)|(15)|(16)|(17)|(19)|(18))\\d{9}$/
	var tip = ''
	var pass = true
	if (!regex.test(code)) {
		tip = '电话格式错误！'
		pass = false
	}

	if (!pass) alert(tip)
	return pass
}

//传真号码合法性验证
function FaxValid(code) {
	var regex = /^((\+?[0-9]{2,4}\-[0-9]{3,4}\-)|([0-9]{3,4}\-))?([0-9]{7,8})(\-[0-9]+)?$/
	var tip = ''
	var pass = true
	if (!regex.test(code)) {
		tip = '传真号码格式错误！'
		pass = false
	}

	if (!pass) alert(tip)
	return pass
}
//电子邮箱合法性验证
function EmailValid(code) {
	var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	var tip = ''
	var pass = true
	if (!regex.test(code)) {
		tip = '电子邮箱格式错误！'
		pass = false
	}

	if (!pass) alert(tip)
	return pass
}

//组织机构代码合法性验证
function OrgCodeValid(orgCode) {
	var tip = ''
	var pass = true
	var ws = [3, 7, 9, 10, 5, 8, 4, 2]
	var str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	if (orgCode.length != 10) {
		tip = '组织机构代码长度必须为10位.'
		pass = false
	} else {
		var patrn = /^([0-9A-Z]){8}-[0-9|X]$/
		if (patrn.test(orgCode) == false) {
			tip = '组织机构代码格式不正确'
			pass = false
		} else {
			var lastpatrn = /^[0-9X]+$/
			var checkcode = orgCode.substring(9, 10)
			if (lastpatrn.test(checkcode) == false) {
				tip = '组织机构代码最后一位只可为数字或大写拉丁字母:X'
				pass = false
			} else {
				var ancode
				var total = 0
				for (var i = 0; i < orgCode.length - 1; i++) {
					if (i == orgCode.length - 2) {
						continue
					}
					ancode = orgCode.substring(i, i + 1)
					total = total + str.indexOf(ancode) * ws[i]
				}
				var logiccheckcode = 11 - (total % 11)
				if (logiccheckcode == 10) {
					logiccheckcode = 'X'
				}
				if (logiccheckcode == 11) {
					logiccheckcode = '0'
				}
				if (checkcode != logiccheckcode) {
					tip = '组织机构代码结构错误.最后一位校验码应为:' + logiccheckcode
					pass = false
				} else {
					pass = true
				}
			}
		}
	}

	if (!pass) alert(tip)
	return pass
}

//IP地址验证
function isIpAddress(code) {
	var regex =
		/^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/
	var tip = ''
	var pass = true
	if (!regex.test(code)) {
		tip = 'IP地址格式不正确！'
		pass = false
	}
	if (!pass) alert(tip)
	return pass
}
