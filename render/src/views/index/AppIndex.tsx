import React from 'react'
import LinkCard from '@/components/link/LInkCard'
import { Home, MessageSecurity, MessageOne } from '@icon-park/react'

const AppIndex: React.FC<{}> = () => {
	return (
		<div className="link-card">
			<LinkCard img={<Home theme="outline" size="24" fill="#333" />} title="首页" link="/"></LinkCard>
			<LinkCard img={<MessageSecurity theme="outline" size="24" fill="#333" />} title="加密" link="/crypto"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="消息" link="/message"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="文件管理" link="/upfile"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="区域管理" link="/area"></LinkCard>
			<LinkCard img={<MessageOne theme="outline" size="24" fill="#333" />} title="OSS" link="/oss"></LinkCard>
		</div>
	)
}

export default AppIndex
