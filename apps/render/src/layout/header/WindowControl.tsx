import minimize from '@/image/minimize.svg';
import max from '@/image/max.svg';
import normal from '@/image/normal.svg';
import close from '@/image/close.svg';
import { useEffect, useMemo, useState } from 'react';

export enum ElectronWindownStatus {
	minimize = 1,
	maximize = 2,
	normal = 3,
}

function WindowControl() {
	let [minmax, setMax] = useState(ElectronWindownStatus.maximize);

	function minimizeHandle() {
		const ipcRenderer = window.CONTEXT_BRIDGE_API?.ipcRenderer;
		ipcRenderer.send('window-min');
	}

	function maxHandle() {
		const ipcRenderer = window.CONTEXT_BRIDGE_API?.ipcRenderer;
		ipcRenderer.send('window-max');
	}

	function normalHandle() {
		const ipcRenderer = window.CONTEXT_BRIDGE_API?.ipcRenderer;
		ipcRenderer.send('window-normal');
	}

	function closeHandle() {
		const ipcRenderer = window.CONTEXT_BRIDGE_API?.ipcRenderer;
		ipcRenderer.send('window-close');
	}

	useEffect(() => {
		const ipcRenderer = window.CONTEXT_BRIDGE_API?.ipcRenderer;
		console.log(ipcRenderer);
		// 接受最大化，最小化完成
		ipcRenderer.on('window-max-min', (event: any, args: number) => {
			setMax(args);
		});
	}, []);

	const MaxMinControl = useMemo(() => {
		if (minmax === ElectronWindownStatus.minimize) {
			return (
				<span
					className="window-max-restore window-normal"
					onClick={normalHandle}
					data-windowflag="normal"
				>
					<img src={normal} alt="normal" />
				</span>
			);
		} else {
			return (
				<span className="window-max-restore window-max" onClick={maxHandle} data-windowflag="max">
					<img src={max} alt="max" />
				</span>
			);
		}
	}, [minmax]);

	return (
		<div className="window-controls-tool">
			<span className="window-minimize" onClick={minimizeHandle}>
				<img src={minimize} alt="minimize" />
			</span>
			{MaxMinControl}
			<span className="window-close" onClick={closeHandle}>
				<img src={close} alt="close" />
			</span>
		</div>
	);
}

export default WindowControl;
