import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
	source: { entry: { index: './src/main.tsx' } },
	html: { template: './index.html' },
	dev: { hmr: true },
	plugins: [pluginReact(), pluginSass()],
	resolve: { alias: { '@': './src' } },
	output: { assetPrefix: './', cleanDistPath: true, distPath: { root: path.resolve('./dist') } },
});
