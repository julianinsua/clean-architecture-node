import type { NextFunction, Request, Response } from 'express'
import type { iProduct } from 'src/entities/Product'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import productsRepo from 'src/frameworks/repositories/inMemory/products.repo'
import { GetProductById } from 'src/useCases/products/getProductById.useCase'

export class GetProductByIdController {
	private readonly useCase: iUseCase<string, iProduct | undefined>

	constructor(useCase: iUseCase<string, iProduct | undefined>) {
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

export const getProductByIdController = new GetProductByIdController(
	new GetProductById(productsRepo)
)
