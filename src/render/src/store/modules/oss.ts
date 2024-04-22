import { createSlice } from '@reduxjs/toolkit'
import type { StateData } from '@/views/oss/types'

const ossSlice = createSlice({
	name: 'oss',
	initialState: {
		files: [],
		folders: [],
	} as StateData,
	reducers: {
		update(state, actions?) {
			const payload = actions?.payload as StateData
			state.files = [...state.files, ...payload.files] // payload.files
			state.folders = [...state.folders, ...payload.folders] // payload.folders
		},
		reset(state, actions?) {
			const payload = actions?.payload as StateData
			state.files = payload.files
			state.folders = payload.folders
		},
	},
})

export default ossSlice.reducer

export const { update, reset } = ossSlice.actions
