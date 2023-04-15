import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import loginReducer from './modules/login'
import updateReducer from './modules/update'

const store = configureStore({
	reducer: {
		counterReducer,
		loginReducer,
		updateReducer,
	},
})

export default store
