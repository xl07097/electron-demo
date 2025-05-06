import path from 'node:path'
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginSass } from '@rsbuild/plugin-sass'
import { pluginLess } from '@rsbuild/plugin-less'
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
	plugins: [pluginReact(), pluginSass(), pluginLess(), pluginNodePolyfill()],
	resolve: {
		alias: {
			'@': './',
		},
	},
	output: {
		assetPrefix: './',
		cleanDistPath: true,
		distPath: {
			root: path.resolve('./build'),
		},
	},
	tools: {
		rspack: {
			target: 'electron-renderer',
		},
	},
})
