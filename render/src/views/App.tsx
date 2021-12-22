import { useState } from 'react'
import AppHeader from '../layout/header/AppHeader'
import AppContent from '../layout/content/AppContent'
function App() {
	const [count, setCount] = useState(0)

	return (
		<div className="window-body-wrapper">
			<AppHeader></AppHeader>
			<AppContent></AppContent>
		</div>
	)
}

export default App
