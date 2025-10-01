import React from 'react'
import { Tooltip, Image } from 'antd'
import db from '@/assets/db.png'
import './item.scss'

interface IProp {
	name: string
	region: string
	lastModified?: string
	storageClass?: string
	onDoubleClick?: () => void
}

const Item: React.FC<IProp> = props => {
	const doubleClick = () => {
		props.onDoubleClick && props.onDoubleClick()
	}
	return (
		<div className="bucket-item" onDoubleClick={doubleClick}>
			<Image width={32} height={32} alt={props.name} preview={false} src={db} />

			<div className="bucket-body">
				<h4 className="bucket-title">
					<Tooltip title={props.name} placement="topLeft" color={'var(--color-primary)'}>
						{props.name}
					</Tooltip>
				</h4>
				<div className="bucket-region">{props.region}</div>
			</div>
		</div>
	)
}

export default Item
