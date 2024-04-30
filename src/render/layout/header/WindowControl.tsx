import minimize from '../../image/minimize.svg'
import max from '../../image/max.svg'
import normal from '../../image/normal.svg'
import close from '../../image/close.svg'
import { useEffect, useMemo, useState } from 'react'
const { ipcRenderer } = require('electron')
import { ElectronWindownStatus } from '../../../main/enum/ElectronWindow'

function WindowControl() {
	let [minmax, setMax] = useState(ElectronWindownStatus.maximize)

	function minimizeHandle() {
		ipcRenderer.send('window-min')
	}

	function maxHandle() {
		ipcRenderer.send('window-max')
	}

	function normalHandle() {
		ipcRenderer.send('window-normal')
	}

	function closeHandle() {
		ipcRenderer.send('window-close')
	}

	useEffect(() => {
		// 接受最大化，最小化完成
		ipcRenderer.on('window-max-min', (event: any, args: number) => {
			setMax(args)
		})
	}, [])

	const MaxMinControl = useMemo(() => {
		if (minmax === ElectronWindownStatus.minimize) {
			return (
				<span className="window-max-restore window-normal" onClick={normalHandle} data-windowflag="normal">
					<img src={normal} alt="normal" />
				</span>
			)
		} else {
			return (
				<span className="window-max-restore window-max" onClick={maxHandle} data-windowflag="max">
					<img src={max} alt="max" />
				</span>
			)
		}
	}, [minmax])

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
	)
}

export default WindowControl
