import { Reducer, configureStore } from '@reduxjs/toolkit'

const modules = import.meta.glob('./modules/*.ts', {
	import: 'default',
	eager: true,
})

const reducers = Object.keys(modules).reduce((acc, modulePath) => {
	const moduleName = modulePath.replace(/\.\/modules\/(.*)\.ts/, '$1')
	acc[`${moduleName}Reducer`] = modules[modulePath] as Reducer
	return acc
}, {} as Record<string, Reducer>)

const store = configureStore({
	reducer: reducers,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch
export type RootStore = typeof store
