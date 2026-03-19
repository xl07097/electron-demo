import { defineConfig } from '@rspack/cli'
import * as path from 'node:path'

// const __dirname = path.dirname(new URL(import.meta.url).pathname)

const mainConfig = defineConfig({
	target: 'electron-main',
	entry: {
		main: './src/main/main.ts',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/main'),
	},
	externals: {
		'@deno/kv': 'require("@deno/kv")',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: {
					loader: 'builtin:swc-loader',
					options: {
						jsc: {
							parser: {
								syntax: 'typescript',
							},
						},
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
})

const preloadConfig = defineConfig({
	target: 'electron-preload',
	entry: {
		preload: './src/preload/index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/preload'),
	},
	// 其他配置...
})

export default [mainConfig, preloadConfig]
