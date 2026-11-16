import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolve } from 'import-meta-resolve';
import { registerscreenShop } from './screen/snapshop';
import logger from './logger';
import { createTray } from './tray';

export class AppWindow {
	window: BrowserWindow;

	private isQuitting: boolean;

	constructor() {
		const window = new BrowserWindow({
			title: '创客',
			width: 1000,
			height: 600,
			minWidth: 800,
			minHeight: 600,
			show: false,
			titleBarStyle: 'hidden',
			titleBarOverlay: { color: '#0a7042', symbolColor: '#ffffff', height: 34 },
			webPreferences: {
				nodeIntegration: false,
				contextIsolation: true,
				nodeIntegrationInWorker: true,
				webSecurity: true,
				navigateOnDragDrop: true,
				sandbox: true,
				devTools: true,
				preload: fileURLToPath(resolve('@desktop/preload', import.meta.url)),
			},
		});
		this.window = window;
		this.isQuitting = false;
	}

	public load() {
		if (process.env.NODE_ENV === 'development') {
			this.window.loadURL('http://localhost:3000');
		} else {
			this.window.loadFile(path.join(__dirname, 'index.html'));
		}

		this.window.once('ready-to-show', () => {
			this.window.show();
		});

		this.window.webContents.on('did-fail-load', (_, code, desc, url) => {
			logger.error('页面加载失败:', { code, desc, url });
			this.window.webContents.openDevTools();
		});

		this.window.webContents.once('did-finish-load', () => {
			if (process.env.NODE_ENV === 'development') {
				this.window.webContents.openDevTools();
			}
		});

		this.window.on('close', event => {
			if (!this.isQuitting) {
				event.preventDefault();
				this.window.hide();
			}
		});

		registerscreenShop(this.window);
	}

	get webContent() {
		return this.window.webContents;
	}

	isMinimized() {
		return this.window.isMinimized();
	}

	public isVisible() {
		return this.window.isVisible();
	}

	public restore() {
		this.window.restore();
	}

	public isFocused() {
		return this.window.isFocused();
	}

	public focus() {
		this.window.focus();
	}

	async makeSingleInstance() {
		if (process.mas) return false;
		const gotTheLock = app.requestSingleInstanceLock();
		if (!gotTheLock) {
			app.quit();
			this.show();
			return gotTheLock;
		}
		app.on('second-instance', (event, commandLine, workingDirectory) => {
			this.show();
		});
		return gotTheLock;
	}

	async show() {
		if (this.window) {
			if (!this.window.isVisible()) {
				this.window.show();
			} else if (this.window.isMinimized()) {
				this.window.restore();
			}
			this.window.focus();
		}
	}

	quit() {
		this.isQuitting = true;
		app.quit();
	}
}
