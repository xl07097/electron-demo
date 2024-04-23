import { SetStateAction, useEffect, useState } from 'react'
const { ipcRenderer } = require('electron')
import { Button, Image } from 'antd'
import { IpcRendererEvent } from 'electron'

const Index = function () {
	const screen = () => {
		ipcRenderer.send('screenShop')
	}

	const [src, setSrc] = useState('')

	useEffect(() => {
		const handle = (event: IpcRendererEvent, arg: SetStateAction<string>) => {
			setSrc(arg)
		}

		ipcRenderer.on('screenShop', handle)
		return () => {
			ipcRenderer.off('screenShop', handle)
		}
	}, [])

	return (
		<div>
			<Button onClick={screen}>截屏</Button>
			{src && <Image width={200} src={src} />}
		</div>
	)
}

export default Index
