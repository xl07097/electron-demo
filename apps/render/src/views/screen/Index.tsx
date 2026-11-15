import { useEffect, useState } from 'react';
import { Button, Image } from 'antd';

const Index = function () {
	const screen = () => {
		const ipcRenderer = window.CONTEXT_BRIDGE_API?.ipcRenderer;
		ipcRenderer.send('screenShop');
	};

	const [src, setSrc] = useState('');

	useEffect(() => {
		const ipcRenderer = window.CONTEXT_BRIDGE_API?.ipcRenderer;
		const handle = (...args: unknown[]) => {
			console.log(args);
			const src = args[0];
			setSrc(`data:image/png;base64,${src.data}`);
		};

		ipcRenderer.on('screenShop', handle);
		// return () => {
		// 	ipcRenderer.off('screenShop', handle);
		// };
	}, []);

	return (
		<div>
			<Button onClick={screen}>截屏</Button>
			{src && <Image width={200} src={src} />}
		</div>
	);
};

export default Index;
