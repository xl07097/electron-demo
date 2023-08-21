import {useEffect, useRef, useState } from 'react'
import { get } from '@/http/http'
import { useSearchParams } from 'react-router-dom'
import qs from 'qs'
import useOss from './reducer'
import { Files } from './types'

import FileItem from '@/components/file/Index'
import LoadMore from '@/components/loadmore/Index'

function Index() {
	let [searchParams] = useSearchParams()

	const [hasMore, setHasMore] = useState(false)
	const lastRef = useRef<Files>({ name: '', url: '' })

	const {files, dirs, updateData, resetData} = useOss()

	const search = async (nextMarker: string | null, flag?: number) => {
		let query = qs.stringify({
			delimiter: '/',
			'max-keys': 200,
			prefix: searchParams.get('prefix'),
			'start-after': nextMarker,
		})
		const res = await get(`http://localhost:3003/oss/listV2?${query}`)

		const objects = res.data.objects || []
		const prefixes = res.data.prefixes || []
		if(flag === 1){
			resetData({
				files: objects,
				dirs: prefixes,
			})
		}else{
			updateData({
				files: objects,
				dirs: prefixes,
			})
		}

		lastRef.current = objects.at(-1)

		if (prefixes.length + objects.length < 200) {
			setHasMore(false)
		} else {
			setHasMore(true)
		}
	}

	const loadMore = () => {
		const nextMarker = lastRef.current?.name
		search(nextMarker as string, !nextMarker? 1: 2)
	}

	useEffect(() => {
		setHasMore(false)
		const prefix = searchParams.get('prefix')
		const nextMarker = prefix && prefix.endsWith('/') ? prefix : null
		search(nextMarker, 1)
	}, [searchParams.get('prefix')])

	return (
		<>
			<div className="file">
				{dirs.map(dir => (
					<FileItem key={dir} name={dir} url={`/oss?prefix=${dir}`} fileType={'dir'}></FileItem>
				))}
				{files.map(file => (
					<FileItem key={file.name} name={file.name} url={file.url} size={file.size} fileType={'file'}></FileItem>
				))}
			</div>
			{hasMore && <LoadMore loadMore={loadMore}></LoadMore>}
		</>
	)
}

export default Index
