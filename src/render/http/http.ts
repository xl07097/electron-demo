import axios from 'axios'
import qs from 'qs'
import { storage } from '@/utils/storage'
import { responseHandle } from './httpHandle'

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { IResponseData, IConfig } from '@/interface/login'

class BaseRequest<T> {
	instance: AxiosInstance
	retryQueue: Function[] = [] // 需要重新请求的队列
	isRefresh: boolean = false // 是否在重新自动登录

	constructor(config?: IConfig) {
		this.instance = axios.create({
			baseURL: config?.baseURL,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'content-type': 'application/json',
			},
		})
		this.instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
			const token = 'W88G0R46WEUP9JXKOF6H71WI' // storage.getItem('token')
			if (token) {
				config.headers = config.headers || {}
				config.headers.AuthToken = token
			}
			return config
		})
		this.instance.interceptors.response.use(async (res: AxiosResponse<any, T>) => {
			let data = res.data
			if (res.request.responseType === 'blob') {
				try {
					const text = await res.data.text()
					data = JSON.parse(text)
				} catch (error) {
					return Promise.resolve(res)
				}
			}

			if (data.code === 1001 || data.code === 300) {
				const config = res.config
				const url = res.config.url
				if (!url?.includes('/login') && !url?.includes('/refreshToken')) {
					if (!this.isRefresh) {
						this.isRefresh = true
						return this.retryLogin(config)
					} else {
						return new Promise(resolve => {
							// 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
							this.retryQueue.push(() => {
								resolve(this.instance.request(config))
							})
						})
					}
				}
			}
			responseHandle(data)
			return res.data
		})
	}

	async get(url: string, data?: AxiosRequestConfig<object>) {
		const res = await this.instance.get<any, T>(url, data)
		return res
	}

	async post(url: string, data = {}, config = {}) {
		const res = await this.instance.post<any, T>(url, JSON.stringify(data), {
			...config,
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return res
	}

	async formPost(url: string, data = {}, config = {}) {
		const res = await this.instance.post<any, T>(url, qs.stringify(data), config)
		return res
	}

	async postFile(url: string, data: FormData, config = {}) {
		const res = await this.instance.post<any, T>(url, data, config)
		return res
	}

	async request(config: AxiosRequestConfig) {
		const res = await this.instance.request<any, T>(config)
		return res
	}

	async retryLogin(config: AxiosRequestConfig) {
		const accessToken = storage.getItem('accessToken')
		if (!accessToken) {
			return
		}
		const res = await get('/refreshToken', {
			params: {
				accessToken: accessToken,
			},
		})
		if (res.code === 200) {
			storage.setItem('token', res.data)
			this.isRefresh = false
			this.retryQueue.forEach(cb => cb())
			this.retryQueue = []
			return this.request(config)
		}
	}
}

export default BaseRequest

const http = new BaseRequest<IResponseData>({
	baseURL: 'http://localhost:3003',
})

export const get = http.get.bind(http)
export const post = http.post.bind(http)
export const formPost = http.formPost.bind(http)
export const postFile = http.postFile.bind(http)
