import { Suspense } from 'react'
import Loading from '@/components/loading/Index'

function Lazyoad(Component: React.LazyExoticComponent<any>): React.ReactNode {
	return (
		<Suspense fallback={<Loading />}>
			<Component />
		</Suspense>
	)
}

export default Lazyoad
