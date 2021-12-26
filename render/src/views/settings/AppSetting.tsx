import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { UpdateInfo } from 'electron-updater'
const { ipcRenderer } = require('electron')

import events from '@/utils/event'

const AppSetting: React.FC<{}> = () => {
	let [updateStatus, setUpdateStatus] = useState(0)
	let [progress, setProgress] = useState(0)

	function checkUpdate() {
		ipcRenderer.send('checkForUpdate')
	}

	function updateNow() {
		ipcRenderer.send('isUpdateNow')
	}

	useEffect(() => {
		function downloadProgress(args: UpdateInfo) {
			console.log(args)
			setProgress(2)
		}

		events.on('download-progress', downloadProgress)
		return () => {
			events.off('download-progress', downloadProgress)
		}
	}, [])

	useEffect(() => {
		function updateFn() {
			setUpdateStatus(2)
		}

		events.on('update-downloaded', updateFn)
		return () => {
			events.off('update-downloaded', updateFn)
		}
	}, [])

	return (
		<>
			{updateStatus === 0 ? (
				<Button onClick={checkUpdate}>检查更新</Button>
			) : (
				<Button onClick={updateNow}>立即更新</Button>
			)}
		</>
	)
}

export default AppSetting
