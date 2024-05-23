// import * as OSS from 'ali-oss';
const OSS = require('ali-oss')
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET, bucket } from './ali-key'
const env = process.env

let buckets = bucket
let accessKeyId = ACCESS_KEY_ID
let accessKeySecret = ACCESS_KEY_SECRET
if (!buckets) {
	buckets = env.buckets
	accessKeyId = env.accessKeyId
	accessKeySecret = env.accessKeySecret
}

console.log(buckets)

const client = new OSS({
	bucket: buckets,
	region: 'oss-cn-shanghai',
	accessKeyId: accessKeyId,
	accessKeySecret: accessKeySecret,
	timeout: '100s',
})

function uploadToOSS(objName: string, localFile: string) {
	return new Promise((resolve, reject) => {
		console.log(`[UPLOAD] start to upload ${localFile}.`)
		client
			.put(objName, localFile)
			.then(() => {
				console.log(`[UPLOAD] ${localFile} upload success.`)
				resolve(0)
			})
			.catch((e: Error) => {
				console.log(`[ERROR] ${localFile} upload failed.`)
				reject(e.message)
			})
	})
}

export default uploadToOSS
