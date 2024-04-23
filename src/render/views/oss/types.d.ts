export interface Files {
	name: string
	url: string
	lastModified?: string
	etag?: string
	type?: string
	size?: number
	storageClass?: string
}

export type StateData = {
	files: Files[]
	folders: any[]
}
