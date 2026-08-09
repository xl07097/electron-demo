import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import uploadToOSS from './uploadOSS.ts';
import packageJson from '../package.json' with { type: 'json' };
const {
	version,
	build: { productName },
} = packageJson;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async function () {
	const OSSObjectDir = 'software/install';
	const buildDir = path.join(__dirname, '..', 'release');

	const fileLists = [
		{ ossObjectFile: `latest.yml`, localFile: `latest.yml` },
		{ ossObjectFile: `${productName}-v${version}.exe`, localFile: `${productName}-v${version}.exe` },
	];

	await Promise.all(
		fileLists.map(({ ossObjectFile, localFile }) => {
			return uploadToOSS(`${OSSObjectDir}/${ossObjectFile}`, path.join(buildDir, localFile));
		})
	);
})();
