import { Reducer, configureStore } from '@reduxjs/toolkit'

import counterReducer from './modules/counter'
import ossReducer from './modules/oss'
import updateReducer from './modules/update'

// const modules: Record<string, Reducer> = import.meta.webpackContext('./modules', {
// 	import: 'default',
// 	eager: true,
// 	recursive: false,
// 	regExp: /\.ts$/,
// })

// const reducers = Object.keys(modules).reduce((acc: Record<string, Reducer>, modulePath) => {
// 	const moduleName = modulePath.replace(/\.\/modules\/(.*)\.ts/, '$1')
// 	acc[`${moduleName}Reducer`] = modules[modulePath]
// 	return acc
// }, {})
const reducers: Record<string, Reducer> = {
	counterReducer,
	ossReducer,
	updateReducer,
}
const store = configureStore({
	reducer: reducers,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type RootStore = typeof store
