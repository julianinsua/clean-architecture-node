import type { user } from 'src/entities/User'
import { inMemoryDB } from 'src/frameworks/database/inMemory'
import type { iDatabase } from 'src/frameworks/database/inMemory'

class UsersRepo {
	private readonly database: iDatabase

	constructor(database: iDatabase) {
		this.database = database
	}

	async add(user: user): Promise<user> {
		this.database.users.push(user)
		return user
	}

	async update(user: user): Promise<user | undefined> {
		const index = this.database.users.findIndex((dbUser) => dbUser.id === user.id)
		if (index >= 0) {
			this.database.users[index] = user
			return user
		}
		return undefined
	}

	async delete(userId: string): Promise<string | undefined> {
		const index = this.database.users.findIndex((dbUser) => dbUser.id === userId)

		if (index >= 0) {
			this.database.users.splice(index, 1) // change the original array
			return userId
		}
		return undefined
	}

	async getById(userId: string): Promise<user | undefined> {
		return this.database.users.find((dbUser) => dbUser.id === userId)
	}
}

export default new UsersRepo(inMemoryDB)
