import React, { useEffect, useReducer, useState } from 'react'
import { get } from '@/http/http'
import { Link, useSearchParams, useParams } from 'react-router-dom'
import qs from 'qs'

interface Files {
	name: string
	url: string
	lastModified: string
	etag: string
	type: string
	size: number
	storageClass: string
	// "url": "https://files.zhiqiuge.com/tc.zip",
	// "lastModified": "2023-05-26T09:17:36.000Z",
	// "etag": "\"18F6DA9E0E0135D17284FAFB4326C22E-72\"",
	// "type": "Multipart",
	// "size": 753881746,
	// "storageClass": "Standard",
	// "owner": {
	//     "id": "1126352992679139",
	//     "displayName": "1126352992679139"
	// }
}

interface IAction {
	data?: any
	type: string | number
}

const formReducer = (state: object, action: IAction) => {
	const { data, type } = action
	switch (type) {
		case 'update':
			return {
				...state,
				data,
			}
		case 'add':
			return {}
		default:
			return state
	}
}

const initState = () => ({
	page: 1,
	size: 20,
	files: [],
	dirs: [],
})

function List() {
	const [page, setPage] = useState(1)

	const [size, setSize] = useState(20)

	const refresh = useState(1)

	const [files, setFiles] = useState<Files[]>([])

	const [dirs, setDirs] = useState([])

	let [searchParams, setSearchParams] = useSearchParams()

	const [state, dispatch] = useReducer(formReducer, initState())

	const search = async () => {
		let query = qs.stringify({
			delimiter: '/',
			'max-keys': 20,
			prefix: searchParams.get('prefix'),
		})
		const res = await fetch(`http://localhost:3003/oss/list?${query}`).then(response => response.json())
		setDirs(res.prefixes || [])
		setFiles(res.objects || [])
	}

	useEffect(() => {
		console.log(dirs)
		search()
	}, [searchParams.get('prefix')])

	return (
		<ul>
			{dirs.map(dir => (
				<li key={dir}>
					<Link to={`/filelist?prefix=${dir}`}> {dir} </Link>
				</li>
			))}
			{files.map(file => (
				<li key={file.name}>{file.name}</li>
			))}
		</ul>
	)
}

export default List
