export interface ILogin {
	name: string
	password: string
}

export interface IResponseData {
	code: number
	data: any
	msg: string | null
}

export interface IConfig {
	baseURL?: string
}

export interface IProps {
	children?: React.ReactNode
	[key: string]: any
}
