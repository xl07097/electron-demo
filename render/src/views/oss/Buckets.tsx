import {useEffect, useState } from 'react'
import { get } from '@/http/http'
import FileItem from '@/components/file/Index'

interface Buckets{
  name: string
  region: string
  creationDate: string
  storageClass: string
  StorageClass: string
}

function Index() {

  const [buckets, setBuckets] = useState<Buckets[]>([])

	const search = async () => {
		const res = await get(`/oss/listBuckets?max-keys=20`)
    setBuckets(res.data.buckets)
	}

	useEffect(() => {
		search()
	}, [])

	return (
		<>
			<div className="file">
				{buckets.map(bucket => (
					<FileItem key={bucket.name} name={bucket.name} url={`/oss?bucket=${bucket.name}&region=${bucket.region}`} fileType={'folder'}></FileItem>
				))}
			</div>
		</>
	)
}

export default Index
