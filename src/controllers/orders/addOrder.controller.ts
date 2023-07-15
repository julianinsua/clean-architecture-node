import type { NextFunction, Request, Response } from 'express'
import type { iOrder } from 'src/entities/Order'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import ordersRepo from 'src/frameworks/repositories/inMemory/orders.repo'
import { AddOrder } from 'src/useCases/orders/addOrder.useCase'

export class AddOrderController {
	private readonly useCase: iUseCase<iOrder, iOrder>

	constructor(useCase: iUseCase<iOrder, iOrder>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.body === undefined) {
					throw new Error('No body on the request on the add user controller.')
				}
				const { id, userId, productIds, isPayed, date } = req.body as iOrder

				const result = await this.useCase.execute({ id, userId, productIds, isPayed, date })

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.status(response.responseStatus).json(response.toObj())
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}

export const addOrderController = new AddOrderController(new AddOrder(ordersRepo))
