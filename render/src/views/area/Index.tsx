import { LockOutlined } from '@ant-design/icons'
import { Button, Table } from 'antd'
import qs from 'qs'
import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { get } from '@/http/http'

function Index() {

	const columns = useMemo(() => {
		return [
			{
				title: '序号',
				dataIndex: 'index',
				key: 'index',
				width: 60,
				render: (text: string | number | boolean, record: object, index: number) => {
					return index + 1
				},
			},
			{
				title: '名称',
				dataIndex: 'name',
				width: 100,
			},
			{
				title: '简称',
				dataIndex: 'shortName',
				width: 100,
			},
			{
				title: '父级行政代码',
				dataIndex: 'parentCode',
				width: 100,
			},
			{
				title: '行政代码',
				dataIndex: 'areaCode',
				key: 'areaCode',
				width: 100,
			},
			{
				title: '邮政编码',
				dataIndex: 'zipCode',
				width: 100,
			},
			{
				title: '区号',
				dataIndex: 'cityCode',
				width: 100,
			},
			{
				title: '经度',
				dataIndex: 'lng',
				width: 100,
			},
			{
				title: '纬度',
				dataIndex: 'lat',
				width: 100,
			},
			{
				title: '操作',
				dataIndex: 'areaCode',
				key: 'action',
				width: 160,
				render: (text: string | number | boolean, record: object, index: number) => {
					return (
						<>
							<Button icon={<LockOutlined style={{ color: 'green' }} />} type="text">
								编辑
							</Button>
							<Link to={`/area?parentCode=${text}`}>下一级</Link>
						</>
					)
				},
			},
		]
	}, [])

	const [dataSource, setDataSource] = useState([])

	let [searchParams] = useSearchParams()

	const search = async () => {
		let query = qs.stringify({
			parentCode: searchParams.get('parentCode') ?? '0',
		})
		const res = await get(`http://localhost:3003/area/list?${query}`)
		setDataSource(res.data.records)
	}

	useEffect(() => {
		search()
	}, [searchParams.get('parentCode')])

	return (
		<Table
			size="small"
			rowKey={'areaCode'}
			columns={columns}
			dataSource={dataSource}
			pagination={{ pageSize: 100 }}
		></Table>
	)
}

export default Index
