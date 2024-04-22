import { useNavigate } from 'react-router-dom'
import './style.less'
import React, { useState } from 'react'
import { formatSize } from '@/utils/commons'
import { Image, Tooltip } from 'antd'
import fiels from '@/assets/files.png'

interface FileProp {
	img?: React.ReactNode
	name: string
	url: string
	lastModified?: string
	etag?: string
	type?: string
	size?: number
	storageClass?: string
	fileType: string
}

const FileItem: React.FC<FileProp> = props => {
	const img = props.img

	const navigate = useNavigate()
	const [visible, setVisible] = useState(false)

	const click = () => {
		if (props.fileType === 'folder') {
			navigate(props.url)
		}
	}

	const name = props.fileType === 'folder' ? props.name.split('/').at(-2) : props.name.split('/').at(-1)
	const size = props.fileType === 'file' ? formatSize(props.size as number) : '目录'

	const isImage = /(\.jpg|\.jpeg|\.png|\.svg)$/.test(props.name.toLowerCase())

	const doubleClick = () => {
		if (isImage) {
			setVisible(true)
		}
	}
	return (
			<div className="file-item" onClick={click} onDoubleClick={doubleClick}>
				<div className="file-img">
					{isImage && (props.size as number) < 1024 * 1024 ? (
						<Image width={32} height={32} alt={name} src={props.url} />
					) : (
						<Image width={28} height={28} alt={name} preview={false} src={fiels} />
					)}
				</div>
				<div className="file-body">
					<h4 className="file-title">
						<Tooltip title={name} placement="topLeft" destroyTooltipOnHide color={'var(--color-primary)'}>
							{name}
						</Tooltip>
					</h4>
					<p className="file-tips">{size}</p>
				</div>
			</div>
	)
}

export default FileItem
