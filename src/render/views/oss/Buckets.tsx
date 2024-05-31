import {useEffect, useState } from 'react'
import { get } from '@/http/http'
import FileItem from '@/components/file/Index'
import { useNavigate } from 'react-router-dom'

interface Buckets{
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

	const onClick =async (bucket: Buckets) => {
		await get(`/oss/useBucket?bucket=${bucket.name}`)
		console.log(bucket)
		navigate('/oss')
	}

	useEffect(() => {
		search()
	}, [])

	return (
		<>
			<div className="file">
				{buckets.map(bucket => (
					<div key={bucket.name} onClick={() => onClick(bucket)}>{bucket.name}</div>
					// <FileItem key={bucket.name} name={bucket.name} url={`/oss?bucket=${bucket.name}&region=${bucket.region}`} fileType={'folder'}></FileItem>
				))}
			</div>
		</>
	)
}

export default Index
