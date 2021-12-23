import { defineConfig } from 'vite'
// import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		react(),
		// legacy({
		// 	targets: ['defaults', 'not IE 11'],
		// }),
	],

	build: {
		outDir: '../build',
	},
})
