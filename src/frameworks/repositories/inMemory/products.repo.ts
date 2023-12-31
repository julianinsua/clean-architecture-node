import { type iProduct } from 'src/entities/Product'
import { type iDatabase, inMemoryDB } from 'src/frameworks/database/inMemory'
import { v4 } from 'uuid'

export class ProductsRepo {
	private readonly database: iDatabase

	public constructor(database: iDatabase) {
		this.database = database
	}

	async add(product: iProduct): Promise<iProduct> {
		if (product.id === undefined) {
			product.id = v4()
		}
		this.database.products.push(product)
		return product
	}

	async update(product: iProduct): Promise<iProduct | undefined> {
		const index = this.database.products.findIndex((dbProduct) => dbProduct.id === product.id)
		if (index >= 0) {
			this.database.products[index] = product
			return product
		}
		return undefined
	}

	async delete(productId: string): Promise<string | undefined> {
		const index = this.database.products.findIndex((dbProduct) => dbProduct.id === productId)

		if (index >= 0) {
			this.database.products.splice(index, 1) // change the original array
			return productId
		}
		return undefined
	}

	async getById(productId: string): Promise<iProduct | undefined> {
		return this.database.products.find((dbProduct) => dbProduct.id === productId)
	}
}

export default new ProductsRepo(inMemoryDB)
