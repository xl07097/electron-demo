import React from 'react'
import { Outlet } from 'react-router-dom'

interface AppRouter {
	children?: React.ReactNode
}

const AppRouter: React.FC<AppRouter> = props => {
	return <div className="app-right-content">{props.children}</div>
}

export default AppRouter
