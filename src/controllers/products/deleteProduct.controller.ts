import type { NextFunction, Request, Response } from 'express'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import productsRepo from 'src/frameworks/repositories/inMemory/products.repo'
import { DeleteProduct } from 'src/useCases/products/deleteProduct.useCase'

export class DeleteProductController {
	private readonly useCase: iUseCase<string, string | undefined>

	constructor(useCase: iUseCase<string, string | undefined>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.params === undefined) {
					throw new Error('No params on the request on the delete product by id controller.')
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

export const deleteProductController = new DeleteProductController(new DeleteProduct(productsRepo))
