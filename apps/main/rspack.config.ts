import * as path from 'node:path'

const mainConfig = {
	target: 'electron-main',
	entry: {
		main: './src/main.ts',
	},
	output: {
		filename: '[name].js',
		path: path.resolve('dist'),
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
}

export default mainConfig
