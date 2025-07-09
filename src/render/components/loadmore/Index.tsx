import { useEffect, useRef } from 'react'
import { Spin } from 'antd'
import './style.scss'

interface IProps {
	loadMore?: () => void
}

function Index(props: IProps) {
	const divRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			const { isIntersecting } = entries[0]
			if (isIntersecting) {
				props.loadMore && props.loadMore()
			}
		})
		observer.observe(divRef.current as Element)
		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<div ref={divRef} className="load-more">
			<Spin></Spin>
		</div>
	)
}

export default Index
