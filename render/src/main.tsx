import React from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, HashRouter } from 'react-router-dom'
import './styles/style.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'dayjs/locale/zh-cn'
import App from './views/App'

import './plugin/appUpdate.js'

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
