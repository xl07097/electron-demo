import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import './styles.scss'

const App: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [src, setSrc] = useState<string>()

	const fetchImage = async () => {
		if (loading) {
			return
		}
		setLoading(true)
		const res = await fetch('https://api.vvhan.com/api/bing?size=1920x1080&rand=sj').then(res => res.blob())
		setSrc(window.URL.createObjectURL(res))
		setLoading(false)
	}

	useEffect(() => {
		fetchImage()
	}, [])

	return (
		<div className="wallpaper">
			{src && <Image width="calc(100%)" height={'calc(100%)'} src={src} preview={false} />}
			<div className="refresh" onClick={fetchImage}>
				<img
					className={loading ? 'loading' : ''}
					src="https://infinityicon.infinitynewtab.com/assets/windmill.svg"
					alt="windmill"
				/>
			</div>
		</div>
	)
}

export default App
