import { v4 } from 'uuid'
import { Product, iProduct } from '../../../src/entities/Product'
import { Chance } from 'chance'
import { AddProduct } from '../../../src/useCases/products/addProduct.useCase'
import { GetProductById } from '../../../src/useCases/products/getProductById.useCase'
import { UpdateProduct } from '../../../src/useCases/products/updateProduct.useCase'
import { DeleteProduct } from '../../../src/useCases/products/deleteProduct.useCase'
import type { iRepo } from '../../../src/frameworks/repositories/contracts'

const chance = new Chance()

const mockProductsRepo: iRepo<iProduct> = {
	add: jest.fn(async (product: iProduct) => ({ ...product, id: v4() })),
	update: jest.fn(async (product: Partial<iProduct>) => ({ ...(product as iProduct) })),
	delete: jest.fn(async (productId: string) => productId),
	getById: jest.fn(async (userId: string) =>
		new Product({ id: userId, name: chance.first(), price: chance.integer() }).toObj()
	),
}

describe('Product use cases', () => {
	test('Add product', async () => {
		const newProduct: iProduct = {
			id: v4(),
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.url()],
			price: chance.integer(),
			color: chance.color(),
			meta: { feel: { texture: 'soft' } },
		}

		const addProduct = await new AddProduct(mockProductsRepo).execute(newProduct)

		expect(addProduct).toBeDefined()

		const call = (mockProductsRepo?.add as jest.Mock).mock.calls[0][0]
		expect(call.name).toBeDefined()
	})

	test('Get product by Id', async () => {
		const newProduct: iProduct = {
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.url()],
			price: chance.integer(),
			color: chance.color(),
			meta: { feel: { texture: 'soft' } },
		}

		const { id } = await new AddProduct(mockProductsRepo).execute(newProduct)
		const stored = await new GetProductById(mockProductsRepo).execute(id as string)

		expect(stored).toBeDefined()

		const call = (mockProductsRepo.getById as jest.Mock).mock.calls[0][0]
		expect(call).toBe(id)
	})

	test('Update product', async () => {
		const newProduct: iProduct = {
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.url()],
			price: chance.integer(),
			color: chance.color(),
			meta: { feel: { texture: 'soft' } },
		}

		const modifiedProduct: iProduct = { ...newProduct, name: chance.word() }

		const { id } = await new AddProduct(mockProductsRepo).execute(newProduct)
		const stored = await new UpdateProduct(mockProductsRepo).execute({ id, ...modifiedProduct })

		expect(stored).toBeDefined()

		const call = (mockProductsRepo.update as jest.Mock).mock.calls[0][0]
		expect(call.name).toBe(modifiedProduct.name)
	})

	test('Delete product', async () => {
		const newProduct: iProduct = {
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.url()],
			price: chance.integer(),
			color: chance.color(),
			meta: { feel: { texture: 'soft' } },
		}

		const { id } = await new AddProduct(mockProductsRepo).execute(newProduct)
		const deletedId = await new DeleteProduct(mockProductsRepo).execute(id as string)

		expect(deletedId).toBeDefined()
		const call = (mockProductsRepo.delete as jest.Mock).mock.calls[0][0]
		expect(call).toBe(id)
	})
})
