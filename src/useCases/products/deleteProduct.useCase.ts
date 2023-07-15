import type { iUseCase } from 'src/frameworks/repositories/contracts'
import type { ProductsRepo } from 'src/frameworks/repositories/inMemory/products.repo'

export class DeleteProduct implements iUseCase<string, string | undefined> {
	private readonly productRepo: ProductsRepo

	constructor(productRepo: ProductsRepo) {
		if (productRepo === undefined) {
			throw new Error('Forgot the productRepo on the Get Product By Id use case.')
		}

		this.productRepo = productRepo
	}

	public async execute(productId: string): Promise<string | undefined> {
		if (this.productRepo.delete === undefined) {
			throw new Error("There's no delete method on the repo")
		}

		const dbProductId = await this.productRepo.delete(productId)
		return dbProductId
	}
}
