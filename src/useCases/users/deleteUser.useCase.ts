import type { iUseCase, iUserRepo } from 'src/frameworks/repositories/contracts'

export class DeleteUser implements iUseCase<string, Promise<string | undefined>> {
	private readonly userRepo: iUserRepo

	public constructor(userRepo: iUserRepo) {
		this.userRepo = userRepo
	}

	public async execute(userId: string): Promise<string | undefined> {
		const deletedUserId = await this.userRepo.delete(userId)

		return deletedUserId
	}
}
