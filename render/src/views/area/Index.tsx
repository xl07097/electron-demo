import { LockOutlined } from "@ant-design/icons"
import { Button, Table } from "antd"
import qs from "qs"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function Index(){

  const toNextLevel = () => {

  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text: string | number | boolean, record: object, index: number) => {
        return index +1
      }
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '简称',
      dataIndex: 'shortName',
    },
    {
      title: '父级行政代码',
      dataIndex: 'parentCode',
    },
    {
      title: '行政代码',
      dataIndex: 'areaCode',
      key: 'areaCode',
    },
    {
      title: '邮政编码',
      dataIndex: 'zipCode',
    },
    {
      title: '区号',
      dataIndex: 'cityCode',
    },
    {
      title: '经度',
      dataIndex: 'lng',
    },
    {
      title: '纬度',
      dataIndex: 'lat',
    },
    {
      title: '操作',
      dataIndex: 'areaCode',
      key: 'action',
      width: 200,
      render: (text: string | number | boolean, record: object, index: number) => {
        return (
          <>
            <Button icon={<LockOutlined style={{color: 'green'}} />} type='text'>编辑</Button>
            <Link to={`/area?parentCode=${text}`}>下一级</Link>
          </>
        ) 
      }
    },

  ]
  const [dataSource, setDataSource] = useState([])

  
  let [searchParams] = useSearchParams();

  const search = async () => {
     let query = qs.stringify({
      parentCode: searchParams.get('parentCode') ?? '0'
    })
    const res = await fetch(`http://localhost:3003/area/list?${query}`).then(response => response.json())
    setDataSource(res.rows)
  }

  useEffect(() => {
    search()
  }, [searchParams.get('parentCode')])

  return (<Table size="small" rowKey={'areaCode'} columns={columns} dataSource={dataSource} pagination={{ pageSize: 100 }}></Table>)
}

export default Index
