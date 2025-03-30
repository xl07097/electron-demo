import React from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
// import '@excalidraw/excalidraw/dist/dev/index.css'
import '@excalidraw/excalidraw/index.css'

function ExcalidrawView() {
	return (
		<div style={{ height: 'calc(100%)', boxShadow: '0 0 10px rgba(0,0,0, 0.17),0 0 10px rgba(0,0,0, 0.17)' }}>
			<Excalidraw langCode="zh-CN" />
		</div>
	)
}

export default ExcalidrawView
