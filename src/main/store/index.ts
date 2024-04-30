import { openKv, Kv, KvKey, KvListSelector } from '@deno/kv'
import { app } from 'electron'

class KV {
	kv: Kv
	constructor() {
		this.init()
	}

	async init() {
		const userData = app.getPath('userData')
		console.log(userData)
		this.kv = await openKv(`${userData}\\data.db`)
	}

	async get(key: KvKey) {
		const result = await this.kv.get(key)
		return result.value
	}

	async set(key: KvKey, value: any) {
		await this.kv.set(key, value)
	}

	async delete(key: KvKey) {
		await this.kv.delete(key)
	}

	async list(prefix: KvListSelector) {
		return this.kv.list(prefix)
	}
}

const kv = new KV()

export { kv }
