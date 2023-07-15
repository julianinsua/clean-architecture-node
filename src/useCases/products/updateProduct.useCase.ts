import type { iProduct } from 'src/entities/Product'
import type { iProductRepo, iUseCase } from 'src/frameworks/repositories/contracts'

export class UpdateProduct implements iUseCase<iProduct, Promise<iProduct | undefined>> {
	private readonly productRepo: iProductRepo

	constructor(productRepo: iProductRepo) {
		if (productRepo === undefined) {
			throw new Error('Forgot the product repo on the Add Product use case.')
		}

		this.productRepo = productRepo
	}

	public async execute(product: Partial<iProduct>): Promise<iProduct | undefined> {
		if (this.productRepo.update === undefined) {
			throw new Error("There's no add method on the product Repo")
		}

		const dbProduct = await this.productRepo.update(product as iProduct)
		return dbProduct
	}
}
