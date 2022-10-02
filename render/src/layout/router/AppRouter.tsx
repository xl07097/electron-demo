import React from 'react'
import { Outlet } from 'react-router-dom'

interface AppRouter {
	children?: React.ReactElement
}

const AppRouter: React.FC<AppRouter> = props => {
	return (
		<div className="app-right-content">
			<Outlet></Outlet>
		</div>
	)
}

export default AppRouter
