import { ArrowLeft } from '@icon-park/react'
import WindowControl from './WindowControl'
import { useNavigate } from 'react-router-dom'

function AppHeader() {
	let navigate = useNavigate()

	function linkBack() {
		navigate(-1)
	}

	return (
		<header className="window-toolbar">
			<div onClick={linkBack} className="linkBack">
				<ArrowLeft theme="outline" size="20" fill="#fff" strokeWidth={2} />
			</div>
			<div className="window-title">创客</div>
			<WindowControl></WindowControl>
		</header>
	)
}

export default AppHeader
