import type { iProduct } from 'src/entities/Product'
import type { iRepo, iUseCase } from 'src/frameworks/repositories/contracts'

export class GetProductById implements iUseCase<string, iProduct | undefined> {
	private readonly productRepo: iRepo<iProduct>

	constructor(productRepo: iRepo<iProduct>) {
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
