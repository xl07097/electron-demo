import { Outlet } from 'react-router-dom'

import AppLeft from '@/layout/sider/AppLeft'
import AppHeader from './header/AppHeader'

function AppContent() {
	return (
		<div className="window-body-wrapper">
			<AppHeader></AppHeader>
			<div className="window-container">
				<AppLeft></AppLeft>
				<div className="app-right-content">
					<div className='app-right-main scrollbar'>
						<Outlet></Outlet>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AppContent
