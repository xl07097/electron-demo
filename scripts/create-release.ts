import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import packageJson from '../package.json' with { type: 'json' };

type Release = { id: number; upload_url: string; html_url: string };

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY;
const apiUrl = (process.env.GITHUB_API_URL ?? 'https://api.github.com').replace(/\/+$/, '');
const { version, build } = packageJson;
const tagName = process.env.GITHUB_REF_NAME ?? `v${version}`;
const [owner, repo, ...extraRepositoryParts] = repository?.split('/') ?? [];

if (!token) {
	throw new Error('GITHUB_TOKEN is required to create a GitHub release.');
}

if (!owner || !repo || extraRepositoryParts.length > 0) {
	throw new Error('GITHUB_REPOSITORY must be set in the owner/repository format.');
}

async function requestGitHub(url: string, init: RequestInit): Promise<unknown> {
	const response = await fetch(url, {
		...init,
		headers: {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${token}`,
			'X-GitHub-Api-Version': '2026-03-10',
			...init.headers,
		},
	});
	const responseBody = await response.text();

	if (!response.ok) {
		throw new Error(`GitHub API request failed (${response.status}): ${responseBody}`);
	}

	return responseBody ? JSON.parse(responseBody) : undefined;
}

function parseRelease(value: unknown): Release {
	if (
		typeof value !== 'object' ||
		value === null ||
		!('id' in value) ||
		typeof value.id !== 'number' ||
		!('upload_url' in value) ||
		typeof value.upload_url !== 'string' ||
		!('html_url' in value) ||
		typeof value.html_url !== 'string'
	) {
		throw new Error('GitHub returned an invalid release response.');
	}

	return { id: value.id, upload_url: value.upload_url, html_url: value.html_url };
}

async function getReleaseAssets(): Promise<string[]> {
	const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
	const releaseDirectory = path.resolve(scriptDirectory, '../release');
	const installerName = `${build.productName}-win-x64-v${version}.exe`; //${productName}-${os}-${arch}-v${version}.${ext}
	const expectedAssets = new Set([installerName, `${installerName}.blockmap`, 'latest.yml']);
	const files = await readdir(releaseDirectory, { withFileTypes: true });
	const assets = files
		.filter(file => file.isFile() && expectedAssets.has(file.name))
		.map(file => file.name);

	if (!assets.includes(installerName)) {
		throw new Error(`Release installer not found: ${path.join(releaseDirectory, installerName)}`);
	}

	return assets;
}

async function createRelease(): Promise<void> {
	const assets = await getReleaseAssets();
	const repositoryPath = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
	const release = parseRelease(
		await requestGitHub(`${apiUrl}${repositoryPath}/releases`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				tag_name: tagName,
				name: process.env.RELEASE_NAME ?? tagName,
				generate_release_notes: true,
				draft: false,
			}),
		})
	);
	const uploadUrl = release.upload_url.replace(/\{\?.*$/, '');
	const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
	const releaseDirectory = path.resolve(scriptDirectory, '../release');

	for (const assetName of assets) {
		const assetPath = path.join(releaseDirectory, assetName);
		const assetUrl = new URL(uploadUrl);
		assetUrl.searchParams.set('name', assetName);

		await requestGitHub(assetUrl.toString(), {
			method: 'POST',
			headers: { 'Content-Type': 'application/octet-stream' },
			body: new Uint8Array(await readFile(assetPath)),
		});
		console.log(`Uploaded ${assetName}`);
	}

	console.log(`Release created: ${release.html_url}`);
}

createRelease().catch((error: unknown) => {
	console.error('Failed to create GitHub release:', error);
	process.exitCode = 1;
});
