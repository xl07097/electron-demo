import UserInfo from './UserInfo'
import Setting from './Setting'

function AppNavigation() {


	return (
		<div className="app-left-side">
			<div className="app-left-side-inner">
				<UserInfo></UserInfo>
				<Setting></Setting>
			</div>
		</div>
	)
}

export default AppNavigation
