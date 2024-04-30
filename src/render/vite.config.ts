import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		react(),
		Components({
			resolvers: [
				() => {
					return {
						name: 'Icon',
						from: '@icon-park/react',
						sideEffects: '@icon-park/react/es/all',
					}
				},
			],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname),
		},
	},
	build: {
		outDir: '../../build',
		emptyOutDir: true,
	},
	css: {
		preprocessorOptions: {
			less: {
				// 支持内联 JavaScript
				javascriptEnabled: true,
				// 重写 less 变量，定制样式
				modifyVars: {
					// '@primary-color': 'red',
				},
			},
		},
	},
})
