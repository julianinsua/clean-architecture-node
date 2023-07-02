import { User, type user } from 'src/entities/User'
import type { iUseCase, iUserRepo } from 'src/frameworks/repositories/contracts'

export class AddUser implements iUseCase<user, Promise<user>> {
	public usersRepo: iUserRepo

	public constructor(userRepo: iUserRepo | undefined) {
		if (userRepo === undefined) {
			throw new Error('You forgot the user repo in the use case')
		}

		this.usersRepo = userRepo
	}

	public async execute({ firstName, lastName, gender, email, meta }: Partial<user>): Promise<user> {
		// validation
		if (email === undefined) {
			throw new Error('Email is required')
		}

		// Add new user
		const newUser = new User({ firstName, lastName, gender, email, meta })
		const user = await this.usersRepo.add(newUser.toObj())
		return user
	}
}
