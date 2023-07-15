import type { iOrder } from 'src/entities/Order'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import type { OrdersRepo } from 'src/frameworks/repositories/inMemory/orders.repo'

export class AddOrder implements iUseCase<iOrder, iOrder> {
	private readonly orderRepo: OrdersRepo

	constructor(orderRepo: OrdersRepo) {
		if (orderRepo === undefined) {
			throw new Error('Forgot the order repo on the Add Order usecase.')
		}

		this.orderRepo = orderRepo
	}

	public async execute(order: Partial<iOrder>): Promise<iOrder> {
		if (this.orderRepo.add === undefined) {
			throw new Error("There's no add method on the order repo.")
		}
		const dbOrder = await this.orderRepo.add(order as iOrder)
		return dbOrder
	}
}
