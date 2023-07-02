import { v4 } from 'uuid'
import { Order, type iOrder } from '../../../src/entities/Order'
import type { iRepo } from '../../../src/frameworks/repositories/contracts'
import { AddOrder } from '../../../src/useCases/orders/addOrder.useCase'
import { UpdateOrder } from '../../../src/useCases/orders/updateOrder.useCase'
import { GetOrderById } from '../../../src/useCases/orders/getOrderById.useCase'
import { DeleteOrder } from '../../../src/useCases/orders/deleteOrder.useCase'
import { Chance } from 'chance'

const chance = new Chance()

const mockOrderRepo: iRepo<iOrder> = {
	add: jest.fn(async (order: iOrder) => ({ ...order, id: v4() })),
	update: jest.fn(async (order: Partial<iOrder>) => ({ ...(order as iOrder) })),
	delete: jest.fn(async (orderId: string) => orderId),
	getById: jest.fn(
		async (orderId: string) =>
			new Order({
				id: orderId,
				userId: v4(),
				productIds: [v4()],
				isPayed: false,
				date: chance.date(),
			}).toObj()
	),
}

describe('Orders use case', () => {
	test('Add order', async () => {
		const newOrder = {
			userId: v4(),
			productIds: [v4()],
			isPayed: false,
			date: chance.date()
		}

		const addOrder =  await new AddOrder(mockOrderRepo).execute(newOrder)
		expect(addOrder).toBeDefined()

		const call = (mockOrderRepo.add as jest.Mock).mock.calls[0][0]
		expect(call.userId).toBe(addOrder.userId)
	})

	test('Update order', async () => {
		const newOrder = {
			userId: v4(),
			productIds: [v4()],
			isPayed: false,
			date: chance.date()
		}
		const addOrder =  await new AddOrder(mockOrderRepo).execute(newOrder)

		const modifiedOrder = {...addOrder, isPayed: true}
		const updatedOrder = await new UpdateOrder(mockOrderRepo).execute(modifiedOrder)
		expect(updatedOrder).toBeDefined()

		const call = (mockOrderRepo.update as jest.Mock).mock.calls[0][0]
		expect(call.isPayed).toBe(modifiedOrder.isPayed)
		expect(call.id).toBe(modifiedOrder.id)
	})

	test('Get order by Id', async () => {
		const newOrder = {
			userId: v4(),
			productIds: [v4()],
			isPayed: false,
			date: chance.date()
		}
		const addOrder = await new AddOrder(mockOrderRepo).execute(newOrder)
		const storedOrder = await new GetOrderById(mockOrderRepo).execute(addOrder.id)
		
		expect(storedOrder).toBeDefined()
		const call = (mockOrderRepo.getById as jest.Mock).mock.calls[0][0]
		expect(call).toBe(addOrder.id)
	})

	test('Delete order', async () => {
		const newOrder = {
			userId: v4(),
			productIds: [v4()],
			isPayed: false,
			date: chance.date()
		}
		const addOrder = await new AddOrder(mockOrderRepo).execute(newOrder)
		const deletedOrderId = await new DeleteOrder(mockOrderRepo).execute(addOrder.id)
		expect(deletedOrderId).toBeDefined()

		const call = (mockOrderRepo.delete as jest.Mock).mock.calls[0][0]
		expect(call).toBe(addOrder.id)
	})
})
