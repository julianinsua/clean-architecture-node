import type { NextFunction, Request, Response } from 'express'
import type { iProduct } from 'src/entities/Product'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import productsRepo from 'src/frameworks/repositories/inMemory/products.repo'
import { UpdateProduct } from 'src/useCases/products/updateProduct.useCase'

export class UpdateProductController {
	private readonly useCase: iUseCase<iProduct, iProduct | undefined>

	constructor(useCase: iUseCase<iProduct, iProduct | undefined>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.body === undefined) {
					throw new Error('No body on the request on the add product controller.')
				}
				const { id, name, description, images, price, color, meta } = req.body as iProduct

				if (id === undefined) {
					throw new Error('id is required for update')
				}

				const result = await this.useCase.execute({
					id,
					name,
					description,
					images,
					price,
					color,
					meta,
				})

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.json(response)
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}

export const updateProductController = new UpdateProductController(new UpdateProduct(productsRepo))
