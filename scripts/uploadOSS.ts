const OSS = require('ali-oss')

const client = new OSS({
	bucket: process.env.bucket,
	region: 'oss-cn-shanghai',
	accessKeyId: process.env.accessKeyId,
	accessKeySecret: process.env.accessKeySecret,
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
