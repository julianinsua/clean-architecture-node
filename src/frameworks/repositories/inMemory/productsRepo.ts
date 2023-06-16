import { type iProduct } from 'src/entities/Product'
import { type iDatabase } from 'src/frameworks/database/inMemory'

class ProductsRepo {
	private readonly database: iDatabase

	public constructor(database: iDatabase) {
		this.database = database
	}

	async add(product: iProduct): Promise<iProduct> {
		this.database.products.push(product)
		return product
	}

	async update(product: iProduct): Promise<iProduct | undefined> {
		const index = this.database.users.findIndex((dbUser) => dbUser.id === product.id)
		if (index >= 0) {
			this.database.products[index] = product
			return product
		}
		return undefined
	}

	async delete(productId: string): Promise<string | undefined> {
		const index = this.database.users.findIndex((dbProduct) => dbProduct.id === productId)

		if (index >= 0) {
			this.database.products.splice(index, 1) // change the original array
			return productId
		}
		return undefined
	}

	async getById(productId: string): Promise<iProduct | undefined> {
		return this.database.products.find(dbProduct => dbProduct.id === productId)
	}
}

export default ProductsRepo
