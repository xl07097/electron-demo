import React from 'react'
import { Tooltip } from 'antd'
import './item.less'

interface IProp {
	name: string
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
			<div className="bucket-body">
				<h4 className="bucket-title">
					<Tooltip title={props.name} placement="topLeft" destroyTooltipOnHide color={'var(--color-primary)'}>
						{props.name}
					</Tooltip>
				</h4>
			</div>
		</div>
	)
}

export default Item
