const { ipcRenderer } = require('electron');

// 接受最大化，最小化完成
ipcRenderer.on('window-max-min', (event, args) => {
	console.log(args);
	if (args === 1) {
		// 最大
	}
	$el('.window-max').classList.toggle('active');
	$el('.window-normal').classList.toggle('active');
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
