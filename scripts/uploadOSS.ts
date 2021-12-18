// import * as OSS from 'ali-oss';
const OSS = require('ali-oss');
import { ACCESS_KEY_ID, ACCESS_KEY_SECRET, bucket } from './ali-key';

const client = new OSS({
	bucket: bucket,
	region: 'oss-cn-shanghai',
	accessKeyId: ACCESS_KEY_ID,
	accessKeySecret: ACCESS_KEY_SECRET,
	timeout: '100s',
});

function uploadToOSS(objName: string, localFile: string) {
	return new Promise((resolve, reject) => {
		console.log(`[UPLOAD] start to upload ${localFile}.`);
		client
			.put(objName, localFile)
			.then(() => {
				console.log(`[UPLOAD] ${localFile} upload success.`);
				resolve(0);
			})
			.catch((e: Error) => {
				console.log(`[ERROR] ${localFile} upload failed.`);
				reject(e.message);
			});
	});
}

export default uploadToOSS;
