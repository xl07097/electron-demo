import { ArrowLeft } from '@icon-park/react'
import WindowControl from './WindowControl'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function AppHeader() {
	let navigate = useNavigate()
	let [hisToryLength, setHisToryLength] = useState(history.length)

	const location = useLocation()

	function linkBack() {
		navigate(-1)
	}

	console.log('location:', location)

	function toIndex() {
		console.log('lp')
		navigate('/')
	}

	return (
		<header className="window-toolbar">
			{hisToryLength >= 2 ? (
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
