import { createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router'
import { lazy } from 'react'
import Lazyload from './Lazyload'
import BasicLayout from '@/layout/BasicLayout'

const config: RouteObject[] = [
	{
		path: '/',
		element: <BasicLayout></BasicLayout>,
		children: [
			{
				index: true,
				element: Lazyload(lazy(() => import('@/views/index/AppIndex'))),
			},
			{
				path: '/screenCapture',
				element: Lazyload(lazy(() => import('@/views/screen/Index'))),
			},
			{
				path: '/message',
				element: Lazyload(lazy(() => import('@/views/message/Index'))),
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
				path: '/buckets',
				element: Lazyload(lazy(() => import('@/views/oss/Buckets'))),
			},
			{
				path: '/oss',
				element: Lazyload(lazy(() => import('@/views/oss/Index'))),
			},
			{
				path: '/area',
				element: Lazyload(lazy(() => import('@/views/area/Index'))),
			},
			{
				path: '/wallpaper',
				element: Lazyload(lazy(() => import('@/views/wallpaper/Index'))),
			},
			{
				path: '/excalidraw',
				element: Lazyload(lazy(() => import('@/views/excalidraw/Index'))),
			},
			{
				path: '/toolbox',
				element: Lazyload(lazy(() => import('@/views/toolbox/Index'))),
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
