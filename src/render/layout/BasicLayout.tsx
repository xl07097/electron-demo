import { Outlet } from 'react-router-dom'
import {Layout} from 'antd'

const { Header, Content, Sider } = Layout;

import AppLeft from '@/layout/sider/AppLeft'
import AppHeader from './header/AppHeader'

function AppContent() {
	return (
		<Layout className="window-body-wrapper">
			<Header><AppHeader></AppHeader></Header>
			<Layout className="window-container">
				<Sider width="auto">
					<AppLeft></AppLeft>
				</Sider>
				<Content className="app-right-content">
					<div className='app-right-main'>
						<Outlet></Outlet>
					</div>
				</Content>
			</Layout>
		</Layout>
	)
}

export default AppContent
