import { SettingTwo } from '@icon-park/react'
import { useNavigate } from 'react-router-dom'

const Setting = () => {
	const navigate = useNavigate()

	function openSetting() {
		navigate('/setting')
	}

	return (
		<div className="app-left-setting" onClick={openSetting}>
			<SettingTwo theme="outline" size="24" fill="#fff" strokeWidth={2} />
			&nbsp;设置
		</div>
	)
}

export default Setting
