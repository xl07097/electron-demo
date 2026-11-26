import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
// @ts-ignore -- TypeScript does not have a declaration for SCSS side-effect imports.
import './styles.scss';

const App: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const [src, setSrc] = useState<string>();

	const fetchImage = async () => {
		if (loading) {
			return;
		}
		setLoading(true);
		const res = await fetch('http://localhost:3003/unsplash/image/random?query=lake').then(res =>
			res.json()
		);

		setSrc(res.data?.urls?.regular);
		setLoading(false);
	};

	useEffect(() => {
		fetchImage();
	}, []);

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
	);
};

export default App;
