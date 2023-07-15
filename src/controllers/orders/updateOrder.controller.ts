import type { NextFunction, Request, Response } from 'express'
import type { iOrder } from 'src/entities/Order'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import ordersRepo from 'src/frameworks/repositories/inMemory/orders.repo'
import { UpdateOrder } from 'src/useCases/orders/updateOrder.useCase'

export class UpdateOrderController {
	private readonly useCase: iUseCase<iOrder, iOrder | undefined>

	constructor(useCase: iUseCase<iOrder, iOrder | undefined>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.body === undefined) {
					throw new Error('No body on the request on the add product controller.')
				}
				const { id, userId, productIds, isPayed, date } = req.body as iOrder

				if (id === undefined) {
					throw new Error('id is required for update')
				}

				const result = await this.useCase.execute({ id, userId, productIds, isPayed, date })

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.json(response)
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}

export const updateOrderController = new UpdateOrderController(new UpdateOrder(ordersRepo))
