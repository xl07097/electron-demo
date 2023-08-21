import { useSelector, useDispatch } from 'react-redux'
import { update, reset } from '@/store/modules/oss'
import type { RootState } from '@/store/store'
import type { StateData, Files } from './types'

const useOss = () => {
	const dispatch = useDispatch()

	const { files, dirs } = useSelector((state: RootState) => ({
		files: state.ossReducer.files as Files[],
		dirs: state.ossReducer.dirs as any[],
	}))

	const updateData = (payload: StateData) => {
		dispatch(update(payload))
	}
	const resetData = (payload: StateData) => {
		dispatch(reset(payload))
	}
	return {
		files,
		dirs,
		updateData,
		resetData,
	}
}

export default useOss
