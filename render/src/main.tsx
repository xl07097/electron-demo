import React from 'react'
import ReactDOM from 'react-dom'
import './styles/style.less'
import App from './views/App'

// require('./plugin/link')
// require('./plugin/window-btn.js')
import './plugin/appUpdate.js'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
