import type { NextFunction, Request, Response } from 'express'
import type { user } from 'src/entities/User'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import usersRepo from 'src/frameworks/repositories/inMemory/users.repo'
import { UpdateUser } from 'src/useCases/users/updateUser.useCase'

export class UpdateUserController {
	private readonly useCase: iUseCase<user, user | undefined>

	constructor(useCase: iUseCase<user, user | undefined>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.body === undefined) {
					throw new Error('No body on the request on the add user controller.')
				}
				const { id, firstName, lastName, email, gender, meta } = req.body as user

				if (id === undefined) {
					throw new Error('id is required for update')
				}

				const result = await this.useCase.execute({ id, firstName, lastName, gender, email, meta })

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.json(response)
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}
export const updateUserController = new UpdateUserController(new UpdateUser(usersRepo))
