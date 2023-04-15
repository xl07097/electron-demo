import { useEffect } from 'react'
import { ProgressInfo } from 'electron-builder'
import { useSelector, useDispatch } from 'react-redux'

import { Button, Progress, message } from 'antd'

const { ipcRenderer } = require('electron')

import events from '@/utils/event'

import { setStatus, setProgress } from '@/store/modules/update'

export enum UpdateStatus {
	NOCHECKUPDATE = 0, // 还未检测更新
	DOWNLOADINGUPDATE = 1, // 正在下载更新
	NOUPDATE = 2, // 不用更新，
	DOWNLOADEDUPDATE = 3, // 更新下载完成
}

const AppUpdate: React.FC<{}> = () => {
	const { progress, status } = useSelector((state: any) => state.updateReducer)

	const dispatch = useDispatch()

	function checkUpdate() {
		ipcRenderer.send('checkForUpdate')
	}

	function updateNow() {
		ipcRenderer.send('isUpdateNow')
	}

	useEffect(() => {
		function downloadProgress(args: ProgressInfo) {
			dispatch(setProgress(Math.floor(args.percent)))
		}

		function updateAvailable() {
			dispatch(setStatus(UpdateStatus.DOWNLOADINGUPDATE))
		}

		events.on('download-progress', downloadProgress)
		events.on('update-available', updateAvailable)
		return () => {
			events.off('download-progress', downloadProgress)
			events.off('update-available', updateAvailable)
		}
	}, [])

	useEffect(() => {
		function updateFn() {
			dispatch(setStatus(UpdateStatus.DOWNLOADEDUPDATE))
		}

		events.on('update-downloaded', updateFn)

		function updateNot() {
			message.info('最新版本，不用更新')
			dispatch(setStatus(UpdateStatus.NOUPDATE))
		}

		events.on('update-not-available', updateNot)
		return () => {
			events.off('update-downloaded', updateFn)
			events.off('update-not-available', updateNot)
		}
	}, [])

	return (
		<>
			{status === UpdateStatus.NOCHECKUPDATE || status === UpdateStatus.NOUPDATE ? (
				<Button onClick={checkUpdate}>检查更新</Button>
			) : null}
			{status === UpdateStatus.DOWNLOADINGUPDATE ? <Progress percent={progress} /> : null}
			{status === UpdateStatus.DOWNLOADEDUPDATE ? <Button onClick={updateNow}>立即安装</Button> : null}
		</>
	)
}

export default AppUpdate
