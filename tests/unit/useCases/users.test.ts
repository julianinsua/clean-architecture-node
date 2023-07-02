import { AddUser } from '../../../src/useCases/users/addUser.useCase'
import { UpdateUser } from '../../../src/useCases/users/updateUser.useCase'
import { GetUserById } from '../../../src/useCases/users/getUserById.useCase'
import { DeleteUser } from '../../../src/useCases/users/deleteUser.useCase'
import { User, genders, user } from '../../../src/entities/User'
import Chance from 'chance'
import { v4 } from 'uuid'

const chance = new Chance()

const mockUsersRepo = {
	add: jest.fn(async (user: user) => ({ ...user, id: v4() })),
	update: jest.fn(async (user: user) => ({ ...user })),
	delete: jest.fn(async (userId: string) => userId),
	getById: jest.fn(async (userId: string) =>
		new User({ id: userId, email: chance.email() }).toObj()
	),
}

describe('User use cases', () => {
	test('Add user', async () => {
		const newUser: user = {
			firstName: chance.first(),
			lastName: chance.last(),
			email: chance.email(),
			gender: genders.NOT_SPECIFIED,
			meta: { hair: { color: 'red' } },
		}
		const addUser = await new AddUser(mockUsersRepo).execute(newUser)

		expect(addUser).toBeDefined()

		const call = (mockUsersRepo.add as jest.Mock).mock.calls[0][0]
		expect(call.email).toBeDefined()
	})

	test('Get user by Id', async () => {
		const userId = v4()

		const getUser = await new GetUserById(mockUsersRepo).execute(userId)

		expect(getUser).toBeDefined()

		const call = (mockUsersRepo.getById as jest.Mock).mock.calls[0][0]
		expect(call).toBe(userId)
	})

	test('Update user', async () => {
		const newUser: user = {
			firstName: chance.first(),
			lastName: chance.last(),
			email: chance.email(),
			gender: genders.NOT_SPECIFIED,
			meta: { hair: { color: 'black' } },
		}

		const updateUser = await new UpdateUser(mockUsersRepo).execute(newUser)

		expect(updateUser).toBeDefined()

		const call = (mockUsersRepo.update as jest.Mock).mock.calls[0][0]
		expect(call.email).toBeDefined()
	})

	test('Delete user', async () => {
		const userId = v4()
		const deletedUserId = await new DeleteUser(mockUsersRepo).execute(userId)

		const call = (mockUsersRepo.delete as jest.Mock).mock.calls[0][0]
		expect(call).toBe(userId)
	})
})
