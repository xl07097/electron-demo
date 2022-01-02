import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import './styles/style.less'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import 'dayjs/locale/zh-cn'
import App from './views/App'

import './plugin/appUpdate.js'

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<ConfigProvider locale={zhCN}>
				<App />
			</ConfigProvider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
