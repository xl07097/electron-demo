import fs from 'node:fs';

/**
 * 创建发布版本
 */
function createLease() {
	fetch('/repos/xl07097/electron-demo/releases', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Authorization: 'token <YOUR_GITHUB_TOKEN>' },
		body: JSON.stringify({ tag_name: 'v1.0.0', target_commitish: null, name: null, body: null }),
	});
}

/**
 * 上传资源文件
 */
function uploadAssets() {
	fetch('/repos/xl07097/electron-demo/releases/1/assets?name=electron-demo-1.0.0-win32-x64.zip', {
		method: 'POST',
		headers: { 'Content-Type': 'application/zip', Authorization: 'token <YOUR_GITHUB_TOKEN>' },
		body: fs.readFileSync('dist/electron-demo-1.0.0-win32-x64.zip'),
	});
}
