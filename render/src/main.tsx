import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'

import zhCN from 'antd/locale/zh_CN.js'
import 'dayjs/locale/zh-cn'

import './plugin/appUpdate.js'
import store from './store/store'

import App from './views/App'

import './styles/style.less'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<ConfigProvider
					locale={zhCN}
					theme={{
						token: {
							colorPrimary: '#0a7042',
						},
					}}
				>
					<App />
				</ConfigProvider>
			</Provider>
		</HashRouter>
	</React.StrictMode>
)
