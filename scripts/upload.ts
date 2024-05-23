import * as path from 'path'
const OSS = require('ali-oss')
import uploadToOSS from './uploadOSS'
const packageJson = require('../package.json')

const {
	version,
	build: { productName },
} = packageJson

;(async function () {
	const OSSObjectDir = 'software/install'
	const buildDir = path.join(__dirname, '..', 'release')

	const client = new OSS({
		bucket: process.env.buckets,
		region: 'oss-cn-shanghai',
		accessKeyId: process.env.accessKeyId,
		accessKeySecret: process.env.accessKeySecret,
		timeout: '100s',
	})

	const fileLists = [
		{ ossObjectFile: `latest.yml`, localFile: `latest.yml` },
		{ ossObjectFile: `${productName}-${version}.exe`, localFile: `${productName}-${version}.exe` },
	]

	await Promise.all(
		fileLists.map(({ ossObjectFile, localFile }) => {
			return uploadToOSS(client, `${OSSObjectDir}/${ossObjectFile}`, path.join(buildDir, localFile))
		})
	)
})()
