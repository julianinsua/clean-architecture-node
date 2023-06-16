import type { user } from 'src/entities/User'

export interface iDatabase {
	users: user[]
	products: unknown[]
	orders: unknown[]
}

class Db implements iDatabase {
	public users: iDatabase['users']
	public products: iDatabase['products']
	public orders: iDatabase['orders']

	constructor(users = [], products = [], orders = []) {
		this.users = users
		this.products = products
		this.orders = orders
	}
}

export const inMemoryDB = new Db()
