import { Reducer, configureStore } from '@reduxjs/toolkit'

const modules: Record<string, Reducer> = import.meta.glob('./modules/*.ts', {
	import: 'default',
	eager: true,
})

const reducers = Object.keys(modules).reduce((acc: Record<string, Reducer>, modulePath) => {
	const moduleName = modulePath.replace(/\.\/modules\/(.*)\.ts/, '$1')
	acc[`${moduleName}Reducer`] = modules[modulePath]
	return acc
}, {})

const store = configureStore({
	reducer: reducers,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type RootStore = typeof store
