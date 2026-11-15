import fs from 'node:fs';
import builder from 'electron-builder';

const platform = process.platform;

builder
	.build({ config: {} })
	.then(() => {
		console.log('Build completed successfully.');
	})
	.catch(error => {
		console.error('Build failed:', error);
	});
