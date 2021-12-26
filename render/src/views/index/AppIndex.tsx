import React from 'react'
import { NavLink } from 'react-router-dom'

const AppIndex: React.FC<{}> = () => {
	return (
		<div>
			<NavLink to={'/'}>首页</NavLink>&emsp;
			<NavLink to={'/crypto'}>加密</NavLink>&emsp;
			<NavLink to={'/message'}>消息</NavLink>&emsp;
		</div>
	)
}

export default AppIndex
