import type { AxiosResponse } from 'axios'

/**
 *
 * @param {*} res 接口返回原始数据
 * @returns
 */
export const getExportName = (res: AxiosResponse) => {
  const headers: any = res.headers
  const disposition = headers['content-disposition'].split(';')[1]
  const filename = disposition.split('=')[1]
  return decodeURIComponent(filename)
}

/**
 *
 * @param {*} blob blob数据
 * @param {*} filename 文件名
 */
export const saveFile = (blob: Blob, filename: string) => {
  // let blob = new Blob([data], {
  //     type: type                 // 'application/vnd.ms-excel'
  // })
  if ('msSaveOrOpenBlob' in navigator) {
    // 兼容edge
    // window.navigator.msSaveOrOpenBlob(blob, filename)
    // } else if (window.navigator.msSaveBlob) {
    // window.navigator.msSaveBlob(blob, filename)
  } else {
    /* 火狐谷歌的文件下载方式 */
    const a = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    a.href = href
    a.download = filename
    document.body.appendChild(a)
    const evt = new MouseEvent('click', {
      bubbles: false,
      cancelable: true,
      view: window,
    })
    a.dispatchEvent(evt)
    window.URL.revokeObjectURL(href)
    setTimeout(() => {
      document.body.removeChild(a)
    }, 100)
  }
}
