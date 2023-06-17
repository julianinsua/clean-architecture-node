import Chance from 'chance'
import { v4 } from 'uuid'
import { type iOrder } from '../../../src/entities/Order'
import ordersRepo from '../../../src/frameworks/repositories/inMemory/orders.repo'

const chance = new Chance()

describe('Orders repository', () => {
	test('New order added and returned', async () => {
		const testOrder: iOrder = {
			id: v4(),
			userId: v4(),
			productIds: [v4(), v4(), v4()],
			isPayed: chance.bool(),
			date: chance.date(),
		}

		await ordersRepo.add(testOrder)
		const dbTestOrder = await ordersRepo.getById(testOrder.id)
		expect(dbTestOrder).toEqual(testOrder)
	})

	test('Update orders and returned', async () => {
		const testOrder: iOrder = {
			id: v4(),
			userId: v4(),
			productIds: [v4(), v4(), v4()],
			isPayed: chance.bool(),
			date: chance.date(),
		}
		const updatedTestOrder = { ...testOrder, isPayed: !testOrder.isPayed }
		await ordersRepo.add(testOrder)
		await ordersRepo.update(updatedTestOrder)
		const newOrder = await ordersRepo.getById(testOrder.id)

		expect(newOrder?.isPayed).toBe(!testOrder.isPayed)
	})

	test('Delete orders', async () => {
		const testOrder1: iOrder = {
			id: v4(),
			userId: v4(),
			productIds: [v4(), v4(), v4()],
			isPayed: chance.bool(),
			date: chance.date(),
		}
		const testOrder2: iOrder = {
			id: v4(),
			userId: v4(),
			productIds: [v4(), v4(), v4()],
			isPayed: chance.bool(),
			date: chance.date(),
		}

		await ordersRepo.add(testOrder1)
		await ordersRepo.add(testOrder2)
		
		await ordersRepo.delete(testOrder1.id)
		const deletedOrder = ordersRepo.getById(testOrder1.id)
		expect(deletedOrder).toBeUndefined
	})
})
