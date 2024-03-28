import { Knex, knex } from 'knex'

interface User {
	id: number
	age: number
	name: string
	active: boolean
	departmentId: number
}

const config: Knex.Config = {
	client: 'sqlite3',
	connection: {
		filename: './data.db',
	},
}

const knexInstance = knex(config)

try {
	const users = await knex<User>('users').select('id', 'age')
} catch (err) {
	// error handling
}
