import { useEffect } from 'react'
const { ipcRenderer } = require('electron')
const { readdir } = require('fs')

import avatar from '../../image/photo.png'

function AppContent() {
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

	return (
		<div className="window-container">
			<div className="app-left-side scrollbar">
				<div className="app-left-side-inner">
					<img className="avatar" src={avatar} alt="avatar" title="触摸指尖的温暖" />
					<span className="title">触摸指尖的温暖</span>
					<nav className="nav">
						<ul>
							<li className="nav-item" onClick={openFile}>
								系统对话框
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div className="app-right-content">
				<textarea name="editor" className="editor-content"></textarea>
			</div>
		</div>
	)
}

export default AppContent
