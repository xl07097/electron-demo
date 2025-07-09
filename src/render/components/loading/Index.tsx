import { Spin } from 'antd'
import './style.scss'

function Index() {
	return (
		<div className="app-loading">
			<div className="app-loading-logo">
				<img src="https://xiangshuye.oss-cn-shanghai.aliyuncs.com/images/logos/logo3.png" />
			</div>
			<div>
				<Spin size="large" />
			</div>
			<div className="app-loading-title">香树叶</div>
		</div>
	)
}

export default Index
