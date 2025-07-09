import path from 'node:path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill'

export default defineConfig({
	root: './src/render',
	source: {
		entry: {
			index: './main.tsx',
		},
	},
	html: {
		template: './index.html',
	},
	dev: {
		hmr: true,
	},
	plugins: [pluginReact(), pluginSass(), pluginNodePolyfill()],
	resolve: {
		alias: {
			'@': './',
		},
	},
	output: {
		assetPrefix: './',
		cleanDistPath: true,
		distPath: {
			root: path.resolve('./dist/render'),
		},
	},
	tools: {
		rspack: {
			target: 'electron-renderer',
		},
	},
})
