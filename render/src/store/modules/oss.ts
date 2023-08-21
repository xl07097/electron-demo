import { createSlice } from '@reduxjs/toolkit'
import type { StateData } from '@/views/oss/types'

const ossSlice = createSlice({
	name: 'oss',
	initialState: {
		files: [],
		dirs: [],
	} as StateData,
	reducers: {
		update(state, actions?) {
			const payload = actions.payload as StateData
			state.files = [...state.files, ...payload.files] // payload.files
			state.dirs = [...state.dirs, ...payload.dirs] // payload.dirs
		},
		reset(state, actions?) {
			const payload = actions.payload as StateData
			state.files = payload.files
			state.dirs = payload.dirs
		},
	},
})

export default ossSlice.reducer

export const { update, reset } = ossSlice.actions
