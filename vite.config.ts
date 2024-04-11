import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import createImportPlugin from 'vite-plugin-import'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		react(),
		createImportPlugin({
			onlyBuild: false,
			babelImportPluginOptions: [
				{
					libraryName: '@icon-park/react',
					libraryDirectory: 'es/icons',
					camel2DashComponentName: false, // default: true,
				},
			],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/render'),
		},
	},
	build: {
		outDir: './build',
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
