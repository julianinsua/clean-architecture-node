import { type user } from 'src/entities/User'
import type { iUseCase, iUserRepo } from 'src/frameworks/repositories/contracts'

export class GetUserById implements iUseCase<string, user | undefined> {
	public usersRepo: iUserRepo

	public constructor(userRepo: iUserRepo | undefined) {
		if (userRepo === undefined) {
			throw new Error('You forgot the user repo in the use case')
		}

		this.usersRepo = userRepo
	}

	public async execute(userId: string): Promise<user | undefined> {
		// validation
		if (userId?.trim() === undefined) {
			throw new Error('User Id is required')
		}

		// Add new user
		const user = await this.usersRepo.getById(userId)
		return user
	}
}
