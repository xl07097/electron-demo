import * as path from 'node:path'

const preloadConfig = {
	target: 'electron-preload',
	entry: {
		preload: './src/index.ts',
	},
	output: {
		filename: '[name].js',
		path: path.resolve('dist'),
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
}

export default preloadConfig
