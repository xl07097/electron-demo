import { Drawer, Button, Form, Input, Radio, Select, Space } from 'antd'

interface IProp {
	onClose?: Function
}
const initValue = {
	type: 'email',
	to: [],
	from: {
		name: '',
		email: '',
	},
	subject: '接口测试',
	content: {
		type: 'html',
		value: '接口测试',
	},
}
const Edit: React.FC<IProp> = props => {
	const onClose = () => {
		console.log(90)
		props.onClose && props.onClose()
	}

	const onFinish = (values: any) => {
		console.log(values)
	}

	return (
		<Drawer title="Basic Drawer" size="large" onClose={onClose} open={true}>
			<Form
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 14 }}
				onFinish={onFinish}
				layout="horizontal"
				style={{ maxWidth: 600 }}
				initialValues={initValue}
			>
				<Form.Item label="消息类别" name="type" rules={[{ required: true, message: '消息类别必选' }]}>
					<Radio.Group buttonStyle="solid">
						<Radio.Button value="sms">短信</Radio.Button>
						<Radio.Button value="email">邮件</Radio.Button>
						<Radio.Button value="weixin">企业微信</Radio.Button>
						<Radio.Button value="dingding">钉钉</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="接收人" name="to" rules={[{ required: true, type: 'array', message: '接收人必填' },
          { type: 'array', defaultField: { type: 'email' }, message: '邮箱格式', }]}>
					<Select
						mode="tags"
						style={{ width: '100%' }}
						placeholder="接收人"
						options={[{ label: '1058392650@qq.com', value: '1058392650@qq.com' }]}
					/>
				</Form.Item>
				<Form.Item label="主题" name="subject" rules={[{ required: true, message: '主题必填' }]}>
					<Input placeholder="主题" />
				</Form.Item>
				<Form.Item label="内容格式" name={['content', 'type']} rules={[{ required: true, message: '内容格式必填' }]}>
					<Radio.Group buttonStyle="solid">
						<Radio.Button value="txt">文本</Radio.Button>
						<Radio.Button value="html">html</Radio.Button>
						<Radio.Button value="markdown">markdown</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="内容" name={['content', 'value']}  rules={[{ required: true, message: '内容必填' }]}>
					<Input.TextArea showCount maxLength={100} style={{ height: 120, marginBottom: 24 }} placeholder="内容" />
				</Form.Item>
				<Form.Item wrapperCol={{ span: 12, offset: 4 }}>
					<Space>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
						<Button onClick={onClose}>关闭</Button>
					</Space>
				</Form.Item>
			</Form>
		</Drawer>
	)
}

export default Edit
