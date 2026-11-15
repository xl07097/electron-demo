import { useSelector } from 'react-redux';
import { Button, Progress } from 'antd';
import { UpdateStatus } from '@/config/enums/update';
import { useCallback } from 'react';
import type { RootState } from '@/store/store';

const AppUpdate: React.FC<{}> = () => {
	const { progress, status } = useSelector((state: RootState) => state.updateReducer);

	const checkForUpdate = useCallback(() => {
		const ipcRenderer = window.CONTEXT_BRIDGE_API.ipcRenderer;
		ipcRenderer.send('checkForUpdate');
	}, []);

	const installNow = useCallback(() => {
		const ipcRenderer = window.CONTEXT_BRIDGE_API.ipcRenderer;
		ipcRenderer.send('install-now');
	}, []);

	return (
		<>
			{status === UpdateStatus.NOCHECKUPDATE || status === UpdateStatus.NOUPDATE ? (
				<Button onClick={checkForUpdate}>检查更新</Button>
			) : null}
			{status === UpdateStatus.DOWNLOADINGUPDATE ? <Progress percent={progress} /> : null}
			{status === UpdateStatus.DOWNLOADEDUPDATE ? (
				<Button onClick={installNow}>立即安装</Button>
			) : null}
		</>
	);
};

export default AppUpdate;
