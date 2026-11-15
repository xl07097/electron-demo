export interface IpcEvents {
	screenShop: (data: { type: string; data: string }) => void;

	'app:updated': (version: string) => void;
}

export interface IpcRequests {
	'app:get-version': () => string;

	'app:open-devtools': () => void;
}

export type IpcEventChannel = keyof IpcEvents;

export type IpcRequestChannel = keyof IpcRequests;

export type IpcChannel = IpcEventChannel | IpcRequestChannel;

export type IpcEventArgs<C extends IpcEventChannel> = Parameters<IpcEvents[C]>;

export type IpcRequestArgs<C extends IpcRequestChannel> = Parameters<IpcRequests[C]>;
