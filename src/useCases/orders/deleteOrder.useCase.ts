import type { iUseCase } from 'src/frameworks/repositories/contracts'
import type { OrdersRepo } from 'src/frameworks/repositories/inMemory/orders.repo'

export class DeleteOrder implements iUseCase<string, string | undefined> {
	private readonly orderRepo: OrdersRepo

	constructor(orderRepo: OrdersRepo) {
		if (orderRepo === undefined) {
			throw new Error('Forgot the order repo on the get Order by Id use case.')
		}

		this.orderRepo = orderRepo
	}

	public async execute(orderId: string): Promise<string | undefined> {
		if (this.orderRepo.delete === undefined) {
			throw new Error("There's no getById method on the order repo.")
		}
		const dbOrder = await this.orderRepo.delete(orderId)
		return dbOrder
	}
}
