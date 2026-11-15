import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';

import type {
	IpcEventChannel,
	IpcEventArgs,
	IpcRequestChannel,
	IpcRequestArgs,
} from '@electron-monorepo/shared';

const electronHandler = {
	app: { getVersion: () => ipcRenderer.invoke('app:get-version') },

	window: {
		minimize: () => ipcRenderer.send('window:minimize'),
		maximize: () => ipcRenderer.send('window:maximize'),
		close: () => ipcRenderer.send('window:close'),
	},
	clipboard: {
		onScreenShop: () => {
			// 监听 screenShop
		},
	},
	openDevtools() {
		return ipcRenderer.invoke('app:open-devtools');
	},

	ipcRenderer: {
		send<C extends IpcRequestChannel>(channel: C, ...args: IpcRequestArgs<C>) {
			ipcRenderer.send(channel, ...args);
		},

		invoke<C extends IpcRequestChannel>(channel: C, ...args: IpcRequestArgs<C>) {
			return ipcRenderer.invoke(channel, ...args);
		},

		on<C extends IpcEventChannel>(channel: C, callback: (...args: IpcEventArgs<C>) => void) {
			const subscription = (_event: IpcRendererEvent, ...args: IpcEventArgs<C>) => {
				callback(...args);
			};

			ipcRenderer.on(channel, subscription);

			return () => {
				ipcRenderer.removeListener(channel, subscription);
			};
		},

		once<C extends IpcEventChannel>(channel: C, callback: (...args: IpcEventArgs<C>) => void) {
			ipcRenderer.once(channel, (_event, ...args) => {
				callback(...(args as IpcEventArgs<C>));
			});
		},
	},
};

contextBridge.exposeInMainWorld('CONTEXT_BRIDGE_API', electronHandler);

export type ElectronHandler = typeof electronHandler;
