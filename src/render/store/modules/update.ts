import { createSlice } from '@reduxjs/toolkit'

import { UpdateStatus } from '@/config/enums/update'

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
