import { useEffect, useState } from 'react'
import { get } from '@/http/http'
import Item from './Item'
import { useNavigate } from 'react-router-dom'

interface Buckets {
	name: string
	region: string
	creationDate: string
	storageClass: string
	StorageClass: string
}

function Index() {
	const navigate = useNavigate()

	const [buckets, setBuckets] = useState<Buckets[]>([])

	const search = async () => {
		const res = await get(`/oss/listBuckets?max-keys=20`)
		setBuckets(res.data.buckets)
	}

	const onDoubleClick = async (bucket: Buckets) => {
		await get(`/oss/useBucket?bucket=${bucket.name}`)
		console.log(bucket)
		navigate('/oss')
	}

	useEffect(() => {
		search()
	}, [])

	return (
		<>
			<div className="bucket">
				{buckets.map(bucket => (
					<Item key={bucket.name} {...bucket} onDoubleClick={() => onDoubleClick(bucket)}></Item>
				))}
			</div>
		</>
	)
}

export default Index
