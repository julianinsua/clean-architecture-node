import type { iOrder } from 'src/entities/Order'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import type { OrdersRepo } from 'src/frameworks/repositories/inMemory/orders.repo'

export class UpdateOrder implements iUseCase<iOrder, iOrder | undefined> {
	private readonly orderRepo: OrdersRepo

	constructor(orderRepo: OrdersRepo) {
		if (orderRepo === undefined) {
			throw new Error('Forgot the product repo on the Add Product use case.')
		}

		this.orderRepo = orderRepo
	}

	public async execute(order: Partial<iOrder>): Promise<iOrder | undefined> {
		if (this.orderRepo.update === undefined) {
			throw new Error("There's no add method on the product Repo")
		}

		const dbProduct = await this.orderRepo.update(order as iOrder)
		return dbProduct
	}
}
