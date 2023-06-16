import usersRepo from '../../../src/frameworks/repositories/inMemory/usersRepo'
import { User, genders, user } from '../../../src/entities/User'
import Chance from 'chance'
import { v4 } from 'uuid'

const chance = new Chance()

describe('Users Repository', () => {
	test('New User should be added and returned', async () => {
		const testUser: user = {
			id: v4(),
			firstName: chance.first(),
			lastName: chance.last(),
			email: chance.email(),
			gender: genders.FEMALE,
			meta: { hair: { color: 'black' } },
		}

		// const testUserInstance = new User(testUser) // should add a validate function here
		const addedUser = await usersRepo.add(testUser)

		expect(addedUser).toBeDefined()
		expect(addedUser.id).toBeDefined()
		expect(addedUser.firstName).toBe(testUser.firstName)
		expect(addedUser.lastName).toBe(testUser.lastName)
		expect(addedUser.gender).toBe(testUser.gender)
		expect(addedUser.meta).toEqual(testUser.meta)

		// Check get method
		const foundUser = await usersRepo.getById(testUser.id)
		expect(foundUser).toEqual(testUser)
	})

	test('New User should be updated and returned', async () => {
		const user1 = {
			id: v4(),
			firstName: chance.first(),
			lastName: chance.last(),
			email: chance.email(),
			gender: genders.FEMALE,
			meta: { hair: { color: 'black' } },
		}
		await usersRepo.add(user1)

		const updateUser1 = {...user1, lastName: chance.last()}
		await usersRepo.update(updateUser1)
		const updatedUser = await usersRepo.getById(user1.id)
		expect(updatedUser?.lastName).toBe(updateUser1.lastName)
	})

	test('New User should be deleted and not returned', async () => {
		// init two users
		const user1 = {
			id: v4(),
			firstName: chance.first(),
			lastName: chance.last(),
			email: chance.email(),
			gender: genders.FEMALE,
			meta: { hair: { color: 'black' } },
		}

		const user2 = {
			id: v4(),
			firstName: chance.first(),
			lastName: chance.last(),
			email: chance.email(),
			gender: genders.FEMALE,
			meta: { hair: { color: 'black' } },
		}
		// add two users
		const addedUser1 = await usersRepo.add(user1)
		const addedUser2 = await usersRepo.add(user2)
		// delete one user
		const deletedUser = await usersRepo.delete(user1.id)
		const getDeletedUser = await usersRepo.getById(user1.id)
		const getNonDeletedUser = await usersRepo.getById(user2.id)
		// check deletion
		expect(getDeletedUser).toBeUndefined()
		expect(getNonDeletedUser).toBeDefined()
	})
})
