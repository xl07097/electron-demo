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
	useNullAsDefault: true, // 在 SQLite 中使用 NULL 作为默认值
}

const knexInstance = knex(config)

const createTable = async () => {
	const hasTable = await knexInstance.schema.hasTable('users')
	const schema = knexInstance.schema.createSchema('users')
	if (!hasTable) {
		// 创建表格
		await schema.createTable('users', async table => {
			const hasId = await schema.hasColumn('users', 'id')
			if (!hasId) {
				table.increments('id').primary() // 自增 ID 字段
			}

			table.string('username') // 字符串类型的用户名字段
			table.string('age') // 字符串类型的用户名字段
			table.string('email') // 字符串类型的电子邮件字段
		})
	} else {
		await schema.alterTable('users', table => {
			table.increments('id').primary() // 自增 ID 字段
			table.string('username') // 字符串类型的用户名字段
			table.string('age') // 字符串类型的用户名字段
			table.string('email') // 字符串类型的电子邮件字段
		})
	}
}

const getUser = async () => {
	await createTable()
	const users = await knexInstance<User>('users').select('id', 'age')
	console.log(users)
	return users
}

getUser()
