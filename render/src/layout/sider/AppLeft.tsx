const { ipcRenderer } = require('electron')
import { useEffect } from 'react'
const { readdir } = require('fs')

import { SettingTwo } from '@icon-park/react'
import UserInfo from './UserInfo'
import { useNavigate } from 'react-router-dom'

function AppNavigation() {
	const navigate = useNavigate()

	useEffect(() => {
		ipcRenderer.on('selected-directory', (event: any, path: string, ...args: string[]) => {
			console.log(path)
			if (args.includes('openDirectory')) {
				readdir(path[0], function (err: NodeJS.ErrnoException | null, files: string[]) {
					console.log(files)
				})
			}
		})
	}, [])

	function openFile() {
		ipcRenderer.send('open-file-dialog', 'openFile', 'openDirectory')
	}

	function openSetting() {
		navigate('/settings')
	}

	return (
		<div className="app-left-side scrollbar">
			<div className="app-left-side-inner">
				<UserInfo></UserInfo>
				<nav className="nav">
					<ul>
						<li className="nav-item" onClick={openFile}>
							系统对话框
						</li>
					</ul>
				</nav>
				<div className="app-left-setting" onClick={openSetting}>
					<SettingTwo theme="outline" size="24" fill="#fff" strokeWidth={2} />
					&nbsp;设置
				</div>
			</div>
		</div>
	)
}

export default AppNavigation
