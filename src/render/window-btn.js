const { ipcRenderer } = require('electron');

const fs = require('fs');

// 接受最大化，最小化完成
ipcRenderer.on('window-max-min', (event, args) => {
	if (args === 1) {
		$el('.window-max').classList.remove('active');
		$el('.window-normal').classList.add('active');
	} else {
		$el('.window-max').classList.add('active');
		$el('.window-normal').classList.remove('active');
	}
});

$el('.window-close').onclick = function () {
	ipcRenderer.send('window-close');
};

$el('.window-minimize').onclick = function () {
	ipcRenderer.send('window-min');
};

$el('.window-max').onclick = function () {
	ipcRenderer.send('window-max');
};

$el('.window-normal').onclick = function () {
	ipcRenderer.send('window-normal');
};

$el('.nav-item').onclick = function () {
	ipcRenderer.send('open-file-dialog');
};

ipcRenderer.on('selected-directory', (event, path) => {
	console.log(path);
	fs.readdir(path[0], function (err, files) {
		console.log(files);
	});
});

ipcRenderer.on('screen-full', (event, args) => {
	if (args === 1) {
		// 全屏
		$el('.window-toolbar').style.display = 'none';
	} else {
		$el('.window-toolbar').style.display = 'flex';
	}
});
