import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { get } from '@/http/http'
import { useSearchParams } from 'react-router-dom'
import qs from 'qs'

import FileItem from '@/components/file/Index'
import LoadMore from '@/components/loadmore/Index'

interface Files {
	name: string
	url: string
	lastModified?: string
	etag?: string
	type?: string
	size?: number
	storageClass?: string
}

interface IAction {
	data?: {
		files: Files[]
		dirs: any[]
	}
	type: string | number
}
type StateData = {
	files: Files[]
	dirs: any[]
}

type DataReducer = React.Reducer<StateData, IAction>

export const formReducer: DataReducer = (state, action) => {
	const { data, type } = action
	switch (type) {
		case 'update':
			return {
				...state,
				...data,
			}
		case 'add':
			return {
				...state,
			}
		default:
			return state
	}
}

const initState = () => ({
	files: [],
	dirs: [],
})

function Index() {
	let [searchParams] = useSearchParams()

	const [hasMore, setHasMore] = useState(true)
	const lastRef = useRef<Files>({ name: '', url: '' })

	const [state, dispatch] = useReducer<DataReducer>(formReducer, initState())

	const search = async (nextMarker: string | null, flag?: number) => {
		const prefix = searchParams.get('prefix')
		let query = qs.stringify({
			delimiter: '/',
			'max-keys': 200,
			prefix: prefix,
			'start-after': nextMarker,
		})
		const res = await get(`http://localhost:3003/oss/listV2?${query}`)

		const objects = res.data.objects || []
		const prefixes = res.data.prefixes || []

		const { dirs, files } = state
		dispatch({
			type: 'update',
			data: {
				files: flag === 1 ? objects : files.concat(objects),
				dirs: flag === 1 ? prefixes : dirs.concat(prefixes),
			},
		})

		lastRef.current = objects.at(-1)

		if (prefixes.length + objects.length < 200) {
			setHasMore(false)
		} else {
			setHasMore(true)
		}
	}

	const loadMore = () => {
		const nextMarker = lastRef.current?.name
		search(nextMarker as string)
	}

	useEffect(() => {
		const prefix = searchParams.get('prefix')
		const nextMarker = prefix && prefix.endsWith('/') ? prefix : null
		search(nextMarker, 1)
	}, [searchParams.get('prefix')])

	return (
		<>
			<div className="file">
				{state.dirs.map(dir => (
					<FileItem key={dir} name={dir} url={`/oss?prefix=${dir}`} fileType={'dir'}></FileItem>
				))}
				{state.files.map(file => (
					<FileItem key={file.name} name={file.name} url={file.url} size={file.size} fileType={'file'}></FileItem>
				))}
			</div>
			{hasMore && <LoadMore loadMore={loadMore}></LoadMore>}
		</>
	)
}

export default Index
