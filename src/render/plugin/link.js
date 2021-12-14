const shell = require('electron').shell;

const alink = document.querySelectorAll('a[href]');

Array.prototype.forEach.call(alink, link => {
	const url = link.getAttribute('href');
	if (url.startsWith('http')) {
		link.addEventListener('click', e => {
			e.preventDefault();
			shell.openExternal(url); // 使用外部应用打开链接
		});
	}
});
