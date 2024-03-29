import React, { useState } from 'react'
import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps, MenuTheme } from 'antd/es/menu'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem
}

const items: MenuItem[] = [
	getItem('Navigation One', '1', <MailOutlined />),
	getItem('Navigation Two', '2', <CalendarOutlined  />),
	getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
		getItem('Option 3', '3'),
		getItem('Option 4', '4'),
		getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
	]),
	getItem('Navigation Three', 'sub2', <SettingOutlined />, [
		getItem('Option 7', '7'),
		getItem('Option 8', '8'),
		getItem('Option 9', '9'),
		getItem('Option 10', '10'),
	]),
]

const Index: React.FC = () => {
	const [mode, setMode] = useState<'vertical' | 'inline'>('inline')
	const [theme, setTheme] = useState<MenuTheme>('light')

	return (
		<>
			<Menu
				style={{ width: 256 }}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode={mode}
				theme={theme}
				items={items}
			/>
		</>
	)
}

export default Index
