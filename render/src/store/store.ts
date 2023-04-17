import { configureStore } from '@reduxjs/toolkit'

const modules = import.meta.glob('./modules/*.ts', {
	import: 'default',
	eager: true,
})

const reducers = Object.keys(modules).reduce((acc, modulePath) => {
	const moduleName = modulePath.replace(/\.\/modules\/(.*)\.ts/, '$1')
	acc[`${moduleName}Reducer`] = modules[modulePath]
	return acc
}, {} as Record<string, any>)

const store = configureStore({
	reducer: reducers,
})

export default store
