import React from 'react'
import { Outlet } from 'react-router-dom'

const AppRouter: React.FC<{}> = props => {
	return <div className="app-right-content">{props.children}</div>
}

export default AppRouter
