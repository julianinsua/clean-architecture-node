import type { NextFunction, Request, Response } from 'express'
import type { user } from 'src/entities/User'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import usersRepo from 'src/frameworks/repositories/inMemory/users.repo'
import { AddUser } from 'src/useCases/users/addUser.useCase'

export class AddUserController {
	private readonly useCase: iUseCase<user, user>

	constructor(useCase: iUseCase<user, user>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.body === undefined) {
					throw new Error('No body on the request on the add user controller.')
				}
				const { firstName, lastName, email, gender, meta } = req.body as user

				const result = await this.useCase.execute({ firstName, lastName, gender, email, meta })

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.status(response.responseStatus).json(response.toObj())
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}

export const addUserController = new AddUserController(new AddUser(usersRepo))
