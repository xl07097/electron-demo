import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import IdCard from './component/IdCard'

import './style.scss'

export default function TooboxIndex() {
	const [current, setCurrent] = useState('idcard')

	const handleNavClick = (e: React.MouseEvent<HTMLLIElement>) => {
		const target = e.currentTarget
		setCurrent(target.dataset.current || '')
	}

	return (
		<div className="toolbox-index">
			<h1>工具箱</h1>
			<p>这里是工具箱页面，您可以在这里添加各种实用工具。</p>
			<section className="toolbox-section">
				<nav className="toolbox-nav">
					<ul className="toolbox-nav-list">
						<li data-current="idcard" className={current === 'idcard' ? 'active' : ''} onClick={handleNavClick}>
							身份证号码验证
						</li>
						<li data-current="tool2" className={current === 'tool2' ? 'active' : ''} onClick={handleNavClick}>
							工具2
						</li>
						<li data-current="tool3" className={current === 'tool3' ? 'active' : ''} onClick={handleNavClick}>
							工具3
						</li>
					</ul>
				</nav>
				<main className="toolbox-main">{current === 'idcard' && <IdCard />}</main>
			</section>
		</div>
	)
}
