import { useEffect, useState } from 'react'
const {ipcRenderer} = require('electron') 
import { Button, Image } from 'antd'

const Index = function () {
	const screen = () => {
		ipcRenderer.send('screenShop')
	}

	const [src, setSrc] = useState('')

	useEffect(() => {
		ipcRenderer.on('screenShop', (event, arg) => {
			console.log(arg)
			setSrc(arg)
		})
	},[])

	return (
		<div>
			<Button onClick={screen}>截屏</Button>
			{
				src&& <Image width={200} src={src} />
			}
		</div>
	)
}

export default Index
