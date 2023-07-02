import type { iProduct } from 'src/entities/Product'
import type { iRepo, iUseCase } from 'src/frameworks/repositories/contracts'

export class UpdateProduct implements iUseCase<iProduct, iProduct | undefined> {
	private readonly productRepo: iRepo<iProduct>

	constructor(productRepo: iRepo<iProduct>) {
		if (productRepo === undefined) {
			throw new Error('Forgot the product repo on the Add Product use case.')
		}

		this.productRepo = productRepo
	}

	public async execute(product: Partial<iProduct>): Promise<iProduct | undefined> {
		if (this.productRepo.update === undefined) {
			throw new Error("There's no add method on the product Repo")
		}

		const dbProduct = await this.productRepo.update(product)
		return dbProduct
	}
}
