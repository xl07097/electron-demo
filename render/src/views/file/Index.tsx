import React, { useState } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Dragger } = Upload;



const Index: React.FC = () => {
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const props: UploadProps = {
    name: 'upfile',
    action: 'http://localhost:3003/upload/alioss',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setUrl(info.file.response.url)
        message.success(`${info.file.name} 上传成功.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const copy = () => {
    navigator.clipboard.writeText(url).then(function () {
      message.success('复制成功')
    })
  }

  const entryList = () => {
    navigate("/filelist")
  }

  return (<div>
    <Button onClick={entryList}>进入列表</Button>

    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </p>
      <p className="ant-upload-text">文件拖到此处或点击上传</p>
    </Dragger>

    <div className='fileurl'>
      文件地址：{url}
      {
        url && <Button type="link" onClick={copy}>复制地址</Button>
      }
    </div>

    <Outlet></Outlet>
  </div>)
};

export default Index;