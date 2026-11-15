import { useSelector, useDispatch } from 'react-redux'
import { update, reset } from '@/store/modules/oss'
import type { RootState } from '@/store/store'
import type { StateData, Files } from './types'

const useOss = () => {
	const dispatch = useDispatch()

	const { files, folders } = useSelector((state: RootState) => {
		const data = state.ossReducer as StateData
		return data
	})

	const updateData = (payload: StateData) => {
		dispatch(update(payload))
	}
	const resetData = (payload: StateData) => {
		dispatch(reset(payload))
	}
	return {
		files,
		folders,
		updateData,
		resetData,
	}
}

export default useOss
