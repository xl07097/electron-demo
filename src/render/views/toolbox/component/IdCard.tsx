import { Form, Input } from 'antd'

import Validate from '@/utils/validate'

const IdCard = () => {
	const [form] = Form.useForm()

	return (
		<div className="id-card">
			<h1>身份证号码验证工具</h1>
			<p>请输入身份证号码进行验证：</p>
			<Form form={form}>
				<Form.Item
					label="身份证号码"
					name="idCardNumber"
					rules={[
						{
							validator: (_, value) => {
								if (!value) {
									return Promise.resolve()
								}
								const tip = Validate.idCardValid(value)
								if (tip) {
									return Promise.reject(tip)
								}
								return Promise.resolve()
							},
						},
					]}
				>
					<Input type="text" style={{ width: '300px' }} maxLength={18} placeholder="请输入身份证号码" />
				</Form.Item>
			</Form>
		</div>
	)
}

export default IdCard
