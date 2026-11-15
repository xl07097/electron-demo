import type { ElectronHandler } from '@electron-monorepo/preload';

declare global {
	interface Window {
		CONTEXT_BRIDGE_API: ElectronHandler;
	}
}

export {};

declare module '*.svg' {
	const content: string;
	export default content;
}

// declare module '*.svg' {
// 	import * as React from 'react'
// 	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
// 	export default ReactComponent
// }
