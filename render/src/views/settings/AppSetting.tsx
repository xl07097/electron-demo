import { Button, Progress, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { ProgressInfo } from 'electron-builder'
const { ipcRenderer } = require('electron')

import events from '@/utils/event'

export enum UpdateStatus {
	NOCHECKUPDATE = 0, // 还未检测更新
	DOWNLOADINGUPDATE = 1, // 正在下载更新
	NOUPDATE = 2, // 不用更新，
	DOWNLOADEDUPDATE = 3, // 更新下载完成
}

const AppSetting: React.FC<{}> = () => {
	let [updateStatus, setUpdateStatus] = useState(UpdateStatus.NOCHECKUPDATE)
	let [progress, setProgress] = useState<number>(0)

	function checkUpdate() {
		console.log(90)
		ipcRenderer.send('checkForUpdate')
	}

	function updateNow() {
		ipcRenderer.send('isUpdateNow')
	}

	useEffect(() => {
		function downloadProgress(args: ProgressInfo) {
			console.log(args)
			setProgress(Number(args.percent.toFixed(0)))
		}

		function updateAvailable() {
			setUpdateStatus(UpdateStatus.DOWNLOADINGUPDATE)
		}

		events.on('download-progress', downloadProgress)
		events.on('update-available', updateAvailable)
		return () => {
			events.off('download-progress', () => {})
			events.off('update-available', () => {})
		}
	}, [])

	useEffect(() => {
		function updateFn() {
			setUpdateStatus(UpdateStatus.DOWNLOADEDUPDATE)
		}

		events.on('update-downloaded', updateFn)

		function updateNot() {
			message.info('最新版本，不用更新')
			setUpdateStatus(UpdateStatus.NOUPDATE)
		}

		events.on('update-not-available', updateNot)
		return () => {
			events.off('update-downloaded', () => {})
			events.off('update-not-available', () => {})
		}
	}, [])

	// const action = useMemo(() => {
	// 	if (updateStatus === 0) {
	// 		return <Button onClick={checkUpdate}>检查更新</Button>
	// 	} else if (updateStatus === 1) {
	// 		return <Progress percent={progress} />
	// 	} else if (updateStatus === 2) {
	// 		message.info('最新版本，不用更新')
	// 		setUpdateStatus(UpdateStatus.NOCHECKUPDATE)
	// 		return <Button onClick={checkUpdate}>检查更新</Button>
	// 	} else if (updateStatus === 3) {
	// 		return <Button onClick={updateNow}>立即更新</Button>
	// 	}
	// }, [updateStatus, progress])

	return (
		<>
			{updateStatus === 0 || updateStatus === 2 ? <Button onClick={checkUpdate}>检查更新</Button> : null}
			{updateStatus === 1 ? <Progress percent={progress} /> : null}
			{updateStatus === 3 ? <Button onClick={updateNow}>立即更新</Button> : null}
		</>
	)
}

export default AppSetting
