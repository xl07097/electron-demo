const packager = require('electron-packager');

async function bundleElectronApp() {
	const appPaths = await packager({
		name: '创客',
		appVersion: '1.0.0',
		overwrite: true,
		platform: 'win32',
		arch: 'x64',
		ignore: [/build.js/, /.gitignore/, /package.json/, /package-lock.json/],
		dir: './',
		asar: true,
		out: 'dist',
		// asar: {
		// 	unpack: 'app.asar.unpacked',
		// 	unpackDir: 'node_modules',
		// },
		buildVersion: '202005.1152',
	});
	console.log(`Electron app bundles created:\n${appPaths.join('\n')}`);
}

bundleElectronApp();
