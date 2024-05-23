function uploadToOSS(client, objName: string, localFile: string) {
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
