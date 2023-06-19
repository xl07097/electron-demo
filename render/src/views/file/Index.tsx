import React, { useState } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;



const Index: React.FC = () => {
  const [url, setUrl] = useState('')

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

  return (<div>
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <CloudUploadOutlined />
      </p>
      <p className="ant-upload-text">文件拖到此处或点击上传</p>
    </Dragger>

    文件地址：{url}
  </div>)
};

export default Index;