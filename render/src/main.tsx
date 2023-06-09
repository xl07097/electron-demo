import React from 'react'
import { createRoot } from 'react-dom/client'
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
		<Provider store={store}>
			<ConfigProvider
				locale={zhCN}
				theme={{
					token: {
						colorPrimary: '#0a7042',
					},
					components: {
						Menu: {
							itemSelectedBg: '#fff2e8',
							itemHoverBg: '#fff2e8',
							itemSelectedColor: '#fa541c',
							itemHoverColor: '#fa541c',
							itemBorderRadius: 0,
							borderRadius: 0,
							itemMarginInline: 0,
							borderRadiusOuter: 0,
						},
					},
				}}
			>
				<App />
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
)
