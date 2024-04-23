import { ArrowLeft } from '@icon-park/react'
import WindowControl from './WindowControl'
import { useLocation, useNavigate } from 'react-router-dom'

function AppHeader() {
	let navigate = useNavigate()

	const location = useLocation()

	function linkBack() {
		navigate(-1)
	}

	function toIndex() {
		navigate('/')
	}

	return (
		<header className="window-toolbar">
			{location.pathname !== '/' ? (
				<div onClick={linkBack} className="linkBack">
					<ArrowLeft theme="outline" size="20" fill="#fff" strokeWidth={2} />
				</div>
			) : null}

			<div className="window-title" onClick={toIndex}>
				创客
			</div>
			<WindowControl></WindowControl>
		</header>
	)
}

export default AppHeader
