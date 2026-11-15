import { app } from 'electron';
import { AppWindow } from './AppWindow';

let mainWindow: AppWindow;

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
	app.quit();
}

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindowModule();
	}
});

app.on('second-instance', (event, commandLine, workingDirectory) => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		if (!mainWindow.isVisible()) {
			mainWindow.show();
		}

		mainWindow.focus();
	}
});

app.whenReady().then(createWindowModule);

process.on('uncaughtException', (error: Error) => {
	console.group('Uncaught Exception');
	console.error(error);
	console.groupEnd();
});

process.on('unhandledRejection', (reason: unknown) => {
	console.group('Unhandled Rejection');
	console.error(reason);
	console.groupEnd();
});

function createWindowModule() {
	let window = new AppWindow();

	window.load();

	mainWindow = window;
}
