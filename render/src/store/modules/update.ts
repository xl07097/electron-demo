import { createSlice } from '@reduxjs/toolkit'

export enum UpdateStatus {
	NOCHECKUPDATE = 0, // 还未检测更新
	DOWNLOADINGUPDATE = 1, // 正在下载更新
	NOUPDATE = 2, // 不用更新，
	DOWNLOADEDUPDATE = 3, // 更新下载完成
}

const updateSlice = createSlice({
	name: 'update',
	initialState: {
		progress: 0,
		status: UpdateStatus.NOCHECKUPDATE,
	},
	reducers: {
		setProgress(state, { payload }) {
			state.progress = payload
		},
		setStatus(state, { payload }) {
			state.status = payload
		},
	},
})

export default updateSlice.reducer

export const { setProgress, setStatus } = updateSlice.actions
