import type { NextFunction, Request, Response } from 'express'
import type { iProduct } from 'src/entities/Product'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import productsRepo from 'src/frameworks/repositories/inMemory/products.repo'
import { AddProduct } from 'src/useCases/products/addProduct.useCase'

export class AddProductController {
	private readonly useCase: iUseCase<iProduct, iProduct>

	constructor(useCase: iUseCase<iProduct, iProduct>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.body === undefined) {
					throw new Error('No body on the request on the add user controller.')
				}
				const { name, description, images, price, color, meta } = req.body as iProduct

				const result = await this.useCase.execute({ name, description, images, price, color, meta })

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.status(response.responseStatus).json(response.toObj())
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}

export const addProductController = new AddProductController(new AddProduct(productsRepo))
