import * as path from 'path'
import uploadToOSS from './uploadOSS'
import packageJson from '../package.json'
const {
	version,
	build: { productName },
} = packageJson

;(async function () {
	const OSSObjectDir = 'software/install'
	const buildDir = path.join(__dirname, '..', 'release')

	const fileLists = [
		{ ossObjectFile: `latest.yml`, localFile: `latest.yml` },
		{ ossObjectFile: `${productName}-v${version}.exe`, localFile: `${productName}-v${version}.exe` },
	]

	await Promise.all(
		fileLists.map(({ ossObjectFile, localFile }) => {
			return uploadToOSS(`${OSSObjectDir}/${ossObjectFile}`, path.join(buildDir, localFile))
		}),
	)
})()
