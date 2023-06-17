import productsRepo from '../../../src/frameworks/repositories/inMemory/products.repo'
import Chance from 'chance'
import { iProduct } from '../../../src/entities/Product'
import { v4 } from 'uuid'

const chance = new Chance()

describe('Products Repository', () => {
	test('New product added and returned', async () => {
		const testProduct: iProduct = {
			id: v4(),
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.domain()],
			price: chance.floating(),
			color: chance.color(),
			meta: {texture: {feel: "nice"}}
		}

		await productsRepo.add(testProduct)

		const dbProduct = await productsRepo.getById(testProduct.id as string)
		
		expect(dbProduct).toBeDefined()
		expect(dbProduct).toEqual(testProduct)
	})

	test('Update product and return', async () => {
		const testProduct: iProduct = {
			id: v4(),
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.domain()],
			price: chance.floating(),
			color: chance.color(),
			meta: {texture: {feel: "nice"}}
		}

		await productsRepo.add(testProduct)
		
		const updatedTestProduct = {...testProduct, name: chance.word()}

		await productsRepo.update(updatedTestProduct)

		const updatedDbProduct = await productsRepo.getById(testProduct.id as string)

		expect(updatedDbProduct).toBeDefined()
		expect(updatedDbProduct?.name).toBe(updatedTestProduct.name)
	})

	test("Delete product and don't return", async () => {
		const testProduct1: iProduct = {
			id: v4(),
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.domain()],
			price: chance.floating(),
			color: chance.color(),
			meta: {texture: {feel: "nice"}}
		}
		const testProduct2: iProduct = {
			id: v4(),
			name: chance.word(),
			description: chance.paragraph(),
			images: [chance.domain()],
			price: chance.floating(),
			color: chance.color(),
			meta: {texture: {feel: "nice"}}
		}

		await productsRepo.add(testProduct1)
		await productsRepo.add(testProduct2)

		await productsRepo.delete(testProduct1.id as string)
		
		const deletedProduct = await productsRepo.getById(testProduct1.id as string)
		expect(deletedProduct).toBeUndefined()
	})
})
