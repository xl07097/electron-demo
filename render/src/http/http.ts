import axios from "axios";
import qs from "qs";
import { storage } from "@/utils/storage";
import { modifyLoginState } from "@/store/modules/login";
import store from "@/store/store";

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type { IResData, IConfig } from "@/interface/login";

class Http<T> {
  instance: AxiosInstance;
  constructor(config?: IConfig) {
    this.instance = axios.create({
      baseURL: config?.baseURL || "/api",
      withCredentials: true,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    this.instance.interceptors.request.use((config) => {
      const token = storage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.token = token;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      async (res: AxiosResponse<any, T>) => {
        let data = res.data;
        if (res.request.responseType === "blob") {
          try {
            const text = await res.data.text();
            data = JSON.parse(text);
          } catch (error) {
            return Promise.resolve(res);
          }
        }

        if (data.code === 1001 || data.code === 300) {
          const config = res.config;
          const url = res.config.url;
          if (!url?.includes("/login") && !url?.includes("/refreshToken")) {
            if (!isRefresh) {
              isRefresh = true;
              return retryLogin(config);
            } else {
              return new Promise((resolve) => {
                // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                retryQueue.push(() => {
                  resolve(this.instance.request(config));
                });
              });
            }
          }
        }
        return res.data;
      }
    );
  }

  async get(url: string, data?: AxiosRequestConfig<object>) {
    const res = await this.instance.get<any, T>(url, data);
    return res;
  }

  async post(url: string, data = {}, config = {}) {
    const res = await this.instance.post<any, T>(url, JSON.stringify(data), {
      ...config,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  async formPost(url: string, data = {}, config = {}) {
    const res = await this.instance.post<any, T>(
      url,
      qs.stringify(data),
      config
    );
    return res;
  }

  async postFile(url: string, data: FormData, config = {}) {
    const res = await this.instance.post<any, T>(url, data, config);
    return res;
  }

  async request(config: AxiosRequestConfig) {
    const res = await this.instance.request<any, T>(config);
    return res;
  }
}

let isRefresh: boolean = false; // 是否在重新自动登录

let retryQueue: Function[] = []; // 需要重新请求的队列

async function retryLogin(config: object) {
  const accessToken = storage.getItem("accessToken");
  if (!accessToken) {
    store.dispatch(modifyLoginState());
    return;
  }
  const res = await get("/refreshToken", {
    params: {
      accessToken: accessToken,
    },
  });
  if (res.code === 200) {
    storage.setItem("token", res.data);
    isRefresh = false;
    retryQueue.forEach((cb) => cb());
    retryQueue = [];
    return http.request(config);
  }
  store.dispatch(modifyLoginState());
}

const http = new Http<IResData>({});

export default http;

export const get = http.get.bind(http);
export const post = http.post.bind(http);
export const formPost = http.formPost.bind(http);
export const postFile = http.postFile.bind(http);
