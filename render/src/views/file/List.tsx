import React, { useEffect, useState } from "react"
import { get } from "@/http/http";
import { Link, useSearchParams, useParams } from "react-router-dom";
import QueryString from "qs";


interface Files{
  name: string;
  url: string;
  lastModified: string;
  etag: string;
  type: string;
  size: number;
  storageClass: string;
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

function List() {
  const [page, setPage] = useState(1)

  const [size, setSize] = useState(20)

  const refresh = useState(1)

  const [files, setFiles] = useState<Files[]>([])

  const [dirs, setDirs] = useState([])

  let [searchParams, setSearchParams] = useSearchParams();

  const search = async () => {
    let qs = QueryString.stringify({
      delimiter: '/',
      'max-keys': 20,
      prefix: searchParams.get('prefix')
    })
    const res = await fetch('http://localhost:3003/oss/list?' + qs).then(response => response.json())
    setDirs(res.prefixes || [])
    setFiles(res.objects || [])
  }

  useEffect(() => {
    console.log(dirs)
    search()
  }, [searchParams.get('prefix')])

  return (
    <ul>
      {
        dirs.map(dir => <li key={dir}><Link to={`/filelist?prefix=${dir}`}> {dir} </Link></li>)
      }
      {
        files.map(file => <li key={file.name}>{file.name}</li>)
      }
    </ul>
  )
}

export default List