import { SettingTwo } from '@icon-park/react'
import UserInfo from './UserInfo'
import { useNavigate } from 'react-router-dom'

function AppNavigation() {
	const navigate = useNavigate()

	function openSetting() {
		navigate('/setting')
	}

	return (
		<div className="app-left-side scrollbar">
			<div className="app-left-side-inner">
				<UserInfo></UserInfo>
				<div className="app-left-setting" onClick={openSetting}>
					<SettingTwo theme="outline" size="24" fill="#fff" strokeWidth={2} />
					&nbsp;设置
				</div>
			</div>
		</div>
	)
}

export default AppNavigation
