// import { useEffect } from 'react'
const {ipcRenderer} = require('electron') 
import { Button } from 'antd'

const Index = function () {
	const screen = () => {
		ipcRenderer.send('screenShop')
	}

	return (
		<div>
			<Button onClick={screen}>截屏</Button>
		</div>
	)
}

export default Index
