import { Spin } from 'antd'
import './style.less'

function Index() {
	return (
		<div className="app-loading">
			<div className="app-loading__logo">
				<img src="https://files.zhiqiuge.com/images/logos/logo3.png" />
			</div>
			<div>{/* <Spin size="large" /> */}</div>
			<div className="app-loading__title">香树叶</div>
		</div>
	)
}

export default Index
