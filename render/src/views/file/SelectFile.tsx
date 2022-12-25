import { useEffect } from 'react'
const { ipcRenderer } = require('electron')
const { readdir } = require('fs')

function SelectFile() {
	useEffect(() => {
		ipcRenderer.on('selected-directory', (event: any, path: string | undefined, ...args: string[]) => {
			console.log(path)
			if (args.includes('openDirectory') && path) {
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
		<nav className="nav">
			<ul>
				<li className="nav-item" onClick={openFile}>
					系统对话框
				</li>
			</ul>
		</nav>
	)
}

export default SelectFile
