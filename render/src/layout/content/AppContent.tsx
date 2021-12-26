import React, { Suspense } from 'react'

import { Routes, Route } from 'react-router-dom'

import AppNavigation from '@/layout/sider/AppLeft'
import AppRouter from '@/layout/router/AppRouter'

const AppIndex = React.lazy(() => import('@/views/index/AppIndex'))
const AppSetting = React.lazy(() => import('@/views/settings/AppSetting'))

function AppContent() {
	return (
		<div className="window-container">
			<AppNavigation></AppNavigation>
			<Suspense fallback={<div>加载中···</div>}>
				<AppRouter>
					<Routes>
						<Route path="/" element={<AppIndex></AppIndex>}></Route>
						<Route path="/crypto" element={<div>1</div>}></Route>
						<Route path="/message" element={<div>2</div>}></Route>
						<Route path="/settings" element={<AppSetting></AppSetting>}></Route>
					</Routes>
				</AppRouter>
			</Suspense>
		</div>
	)
}

export default AppContent
