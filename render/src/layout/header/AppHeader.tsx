import { ArrowLeft } from '@icon-park/react'
import WindowControl from './WindowControl'
import { useNavigate } from 'react-router-dom'
import { createHashHistory } from 'history'
import { useEffect, useState } from 'react'

function AppHeader() {
	let navigate = useNavigate()
	let [hisToryLength, setHisToryLength] = useState(history.length)

	function linkBack() {
		navigate(-1)
	}

	function toIndex() {
		console.log('lp')
		navigate('/')
	}
	useEffect(() => {
		let history = createHashHistory()
		console.log(history)
		history.listen(() => {
			console.log('2=', window.history.length)
			setHisToryLength(hisToryLength - 1)
		})
	}, [])

	console.log('1=', hisToryLength)
	// setHisToryLength(window.history.length)

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
