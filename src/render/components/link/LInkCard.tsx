import { useNavigate } from 'react-router-dom'
import './style.scss'
import React from 'react'

interface LinkCardProp {
	img?: React.ReactNode
	title: string
	tips?: string
	link: string
}

const LinkCard: React.FC<LinkCardProp> = props => {
	const img = props.img

	const navigate = useNavigate()

	const click = () => {
		navigate(props.link)
	}

	return (
		<div className="link-card-item" onClick={click}>
			<div className="link-card-img">
				{img ? img : <img src={'https://media.goto-mars.com/media/www.dandanzan.cc058RTIOR.ico'} alt={props.title} />}
			</div>
			<div className="link-card-body">
				<h4 className="link-card-title">{props.title}</h4>
				<p className="link-card-tips">{props.tips}</p>
			</div>
		</div>
	)
}

export default LinkCard
