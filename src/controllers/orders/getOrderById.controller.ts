import type { NextFunction, Request, Response } from 'express'
import type { iOrder } from 'src/entities/Order'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import ordersRepo from 'src/frameworks/repositories/inMemory/orders.repo'
import { GetOrderById } from 'src/useCases/orders/getOrderById.useCase'

export class GetOrderByIdController {
	private readonly useCase: iUseCase<string, iOrder | undefined>

	constructor(useCase: iUseCase<string, iOrder | undefined>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.params === undefined) {
					throw new Error('No params on the request on the get product by id controller.')
				}
				const { id } = req.params

				const result = await this.useCase.execute(id)

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.status(response.responseStatus).json(response.toObj())
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}

export const getOrderByIdController = new GetOrderByIdController(new GetOrderById(ordersRepo))
