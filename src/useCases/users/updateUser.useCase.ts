import type { iUseCase, iUserRepo } from 'src/frameworks/repositories/contracts'
import type { user } from 'src/entities/User'

export class UpdateUser implements iUseCase<user, Promise<user | undefined>> {
	private readonly userRepo: iUserRepo

	public constructor(userRepo: iUserRepo) {
		this.userRepo = userRepo
	}

	public async execute(updateUser: Partial<user>): Promise<user | undefined> {
		const dbUser = await this.userRepo.update(updateUser as user)

		return dbUser
	}
}
