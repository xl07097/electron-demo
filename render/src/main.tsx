import React from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, HashRouter } from 'react-router-dom'
import './styles/style.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN.js'
import 'dayjs/locale/zh-cn'
import App from './views/App'

// if (import.meta.env.PROD) {
import './plugin/appUpdate.js'
// }

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<HashRouter>
			<ConfigProvider locale={zhCN}>
				<App />
			</ConfigProvider>
		</HashRouter>
	</React.StrictMode>
)
