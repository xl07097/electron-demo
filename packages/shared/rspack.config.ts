import * as path from 'node:path'

const preloadConfig = {
	entry: {
		index: './src/index.ts',
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
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
}

export default preloadConfig
