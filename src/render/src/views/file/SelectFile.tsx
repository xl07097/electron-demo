import { useEffect } from 'react'
const { ipcRenderer } = require('electron')
import type { IpcRendererEvent } from 'electron'
const { readdir } = require('fs')

const handleFile = (event: IpcRendererEvent, path: string | undefined, ...args: string[]) => {
	console.log(path)
	if (args.includes('openDirectory') && path) {
		readdir(path[0], function (err: NodeJS.ErrnoException | null, files: string[]) {
			console.log(files)
		})
	}
}

function SelectFile() {
	useEffect(() => {
		ipcRenderer.on('selected-directory', handleFile)
		return () => {
			ipcRenderer.removeListener('selected-directory', handleFile)
		}
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
