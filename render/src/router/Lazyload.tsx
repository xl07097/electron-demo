import { Suspense } from 'react'
import Loading from '@/components/loading/Index'
import { Spin } from 'antd'

function Lazyoad(Component: React.LazyExoticComponent<any>): React.ReactNode {
	return (
		<Suspense fallback={<Loading />}>
			<Component />
		</Suspense>
	)
}

export default Lazyoad
