import React, { useEffect, useReducer } from 'react'
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
	data?: {
		files: Files[],
		dirs: any[]
	},
	type: string | number
}
type StateData = { 
	files: Files[],
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

	const [state, dispatch] = useReducer<DataReducer>(formReducer, initState())

	const {dirs, files} = state

	const search = async () => {
		const prefix = searchParams.get('prefix')
		let query = qs.stringify({
			delimiter: '/',
			'max-keys': 1000,
			prefix: prefix,
			'start-after': prefix && prefix.endsWith('/') ? prefix : null,
		})
		const res = await get(`http://localhost:3003/oss/listV2?${query}`)

		dispatch({
			type: 'update',
			data:{
				files: res.data.objects || [],
				dirs: res.data.prefixes || [],
			}
		})
	}

	useEffect(() => {
		search()
	}, [searchParams.get('prefix')])

	return (
		<ul>
			{dirs.map(dir => (
				<li key={dir}>
					<Link to={`/oss?prefix=${dir}`}> {dir} </Link>
				</li>
			))}
			{files.map(file => (
				<li key={file.name}>{file.name}</li>
			))}
		</ul>
	)
}

export default Index
