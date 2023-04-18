import { useSelector } from 'react-redux'
import { Button, Progress } from 'antd'
const { ipcRenderer } = require('electron')
import { UpdateStatus } from '@/config/enums/update'

const AppUpdate: React.FC<{}> = () => {
	const { progress, status } = useSelector((state: any) => state.updateReducer)


	function checkForUpdate() {
		ipcRenderer.send('checkForUpdate')
	}

	function installNow() {
		ipcRenderer.send('install-now')
	}

	return (
		<>
			{status === UpdateStatus.NOCHECKUPDATE || status === UpdateStatus.NOUPDATE ? (
				<Button onClick={checkForUpdate}>检查更新</Button>
			) : null}
			{status === UpdateStatus.DOWNLOADINGUPDATE ? <Progress percent={progress} /> : null}
			{status === UpdateStatus.DOWNLOADEDUPDATE ? <Button onClick={installNow}>立即安装</Button> : null}
		</>
	)
}

export default AppUpdate
