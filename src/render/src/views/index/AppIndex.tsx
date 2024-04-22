import React from 'react'
import LinkCard from '@/components/link/LInkCard'
import { MessageSecurity, MessageOne } from '@icon-park/react'

const AppIndex: React.FC<{}> = () => {
	return (
		<div className="link-card" style={{
			padding: '10px',
		}}>
			<LinkCard img={<MessageSecurity theme="outline" size="24" fill="#333" />} title="截屏" link="/screenCapture"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="消息" link="/message"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="上传" link="/upfile"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="区域管理" link="/area"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="OSS" link="/oss"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="壁纸" link="/wallpaper"></LinkCard>
		</div>
	)
}

export default AppIndex
