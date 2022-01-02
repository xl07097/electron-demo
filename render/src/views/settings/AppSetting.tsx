import { Button, Progress, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { ProgressInfo } from 'electron-builder'
const { ipcRenderer } = require('electron')

import events from '@/utils/event'

export enum UpdateStatus {
	NOCHECKUPDATE = 0, // 还未检测更新
	DOWNLOADINGUPDATE = 1, // 正在下载更新
	NOUPDATE = 2, // 不用更新，
	DOWNLOADEDINGUPDATE = 3, // 更新下载完成
}

const AppSetting: React.FC<{}> = () => {
	let [updateStatus, setUpdateStatus] = useState(UpdateStatus.NOCHECKUPDATE)
	let [progress, setProgress] = useState(0)

	function checkUpdate() {
		ipcRenderer.send('checkForUpdate')
	}

	function updateNow() {
		ipcRenderer.send('isUpdateNow')
	}

	useEffect(() => {
		function downloadProgress(args: ProgressInfo) {
			console.log(args)
			setProgress(args.percent)
		}

		events.on('download-progress', downloadProgress)
		return () => {
			events.off('download-progress', downloadProgress)
		}
	}, [])

	useEffect(() => {
		function updateFn() {
			setUpdateStatus(UpdateStatus.DOWNLOADEDINGUPDATE)
		}

		events.on('update-downloaded', updateFn)

		function updateNot() {
			setUpdateStatus(UpdateStatus.NOUPDATE)
		}

		events.on('update-not-available', updateNot)
		return () => {
			events.off('update-downloaded', updateFn)
			events.off('update-not-available', updateNot)
		}
	}, [])

	const action = useMemo(() => {
		if (updateStatus === 0) {
			return <Button onClick={checkUpdate}>检查更新</Button>
		} else if (updateStatus === 1) {
			return <Progress percent={progress} />
		} else if (updateStatus === 2) {
			message.info('最新版本，不用更新')
			setUpdateStatus(UpdateStatus.NOCHECKUPDATE)
			return <Button onClick={checkUpdate}>检查更新</Button>
		} else if (updateStatus === 3) {
			return <Button onClick={updateNow}>立即更新</Button>
		}
	}, [updateStatus])

	return <>{action}</>
}

export default AppSetting
