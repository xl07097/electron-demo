import { existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export const mkdirs = (dirpath: string) => {
	if (existsSync(dirpath)) return
	if (!existsSync(dirname(dirpath))) {
		mkdirs(dirname(dirpath))
	}
	mkdirSync(dirpath)
}
