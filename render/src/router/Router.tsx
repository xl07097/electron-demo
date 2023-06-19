import { createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router'
import { lazy } from 'react'
import Lazyload from './Lazyload'

const config: RouteObject[] = [
	{
		path: '/',
		element: Lazyload(lazy(() => import('@/layout/BasicLayout'))),
		children: [
			{
				path: '/',
				element: Lazyload(lazy(() => import('@/views/index/AppIndex'))),
			},
			{
				path: '/crypto',
				element: <div>1</div>,
			},
			{
				path: '/message',
				element: Lazyload(lazy(() => import('@/views/menu/Index'))),
			},
			{
				path: '/setting',
				element: Lazyload(lazy(() => import('@/views/settings/AppSetting'))),
			},
			{
				path: '/upfile',
				element: Lazyload(lazy(() => import('@/views/file/Index'))),
			},
			{
				path: '/filelist',
				element: Lazyload(lazy(() => import('@/views/file/List'))),
			},
			{
				path: '*',
				element: Lazyload(lazy(() => import('@/components/404/Index'))),
			},
		],
	},
]

export default createHashRouter(config, {
	basename: '/',
})
