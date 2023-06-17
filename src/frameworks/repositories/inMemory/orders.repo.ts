import { type iOrder } from 'src/entities/Order'
import { type iDatabase, inMemoryDB } from 'src/frameworks/database/inMemory'

class OrdersRepo {
	private readonly database: iDatabase

	public constructor(database: iDatabase) {
		this.database = database
	}

	public async add(order: iOrder): Promise<iOrder | undefined> {
		this.database.orders.push(order)
		return order
	}

	public async update(order: iOrder): Promise<iOrder | undefined> {
		const index = this.database.orders.findIndex((dbOrder) => dbOrder.id === order.id)
		if (index >= 0) {
			this.database.orders[index] = order
			return order
		}
		return undefined
	}

	public async delete(orderId: string): Promise<string | undefined> {
		const index = this.database.orders.findIndex((dbOrder) => dbOrder.id === orderId)
		if (index >= 0) {
			this.database.orders.splice(index, 1)
			return orderId
		}
		return undefined
	}

	public async getById(orderId: string): Promise<iOrder | undefined> {
		return this.database.orders.find((dbOrder) => dbOrder.id === orderId)
	}
}

export default new OrdersRepo(inMemoryDB)
