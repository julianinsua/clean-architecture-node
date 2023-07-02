import type { iOrder } from 'src/entities/Order'
import type { iRepo, iUseCase } from 'src/frameworks/repositories/contracts'

export class GetOrderById implements iUseCase<string, iOrder | undefined> {
	private readonly orderRepo: iRepo<iOrder>

	constructor(orderRepo: iRepo<iOrder>) {
		if (orderRepo === undefined) {
			throw new Error('Forgot the order repo on the get Order by Id use case.')
		}

		this.orderRepo = orderRepo
	}

	public async execute(orderId: string): Promise<iOrder | undefined> {
		if (this.orderRepo.getById === undefined) {
			throw new Error("There's no getById method on the order repo.")
		}
		const dbOrder = await this.orderRepo.getById(orderId)
		return dbOrder
	}
}
