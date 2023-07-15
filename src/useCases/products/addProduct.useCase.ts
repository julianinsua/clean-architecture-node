import type { iProduct } from 'src/entities/Product'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import type { ProductsRepo } from 'src/frameworks/repositories/inMemory/products.repo'

export class AddProduct implements iUseCase<iProduct, iProduct> {
	private readonly productRepo: ProductsRepo

	constructor(productRepo: ProductsRepo) {
		if (productRepo === undefined) {
			throw new Error('Forgot the product repo on the Add Product use case.')
		}

		this.productRepo = productRepo
	}

	public async execute(product: Partial<iProduct>): Promise<iProduct> {
		if (this.productRepo.add === undefined) {
			throw new Error("There's no add method on the product Repo")
		}

		const dbProduct = await this.productRepo.add(product as iProduct)
		return dbProduct
	}
}
