import type { iProduct } from 'src/entities/Product'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import type { ProductsRepo } from 'src/frameworks/repositories/inMemory/products.repo'

export class GetProductById implements iUseCase<string, iProduct | undefined> {
	private readonly productRepo: ProductsRepo

	constructor(productRepo: ProductsRepo) {
		if (productRepo === undefined) {
			throw new Error('Forgot the productRepo on the Get Product By Id use case.')
		}

		this.productRepo = productRepo
	}

	public async execute(productId: string): Promise<iProduct | undefined> {
		if (this.productRepo.getById === undefined) {
			throw new Error("There's no getById method on the repo")
		}

		const dbProduct = await this.productRepo.getById(productId)
		return dbProduct
	}
}
