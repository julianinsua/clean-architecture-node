import type { NextFunction, Request, Response } from 'express'
import type { user } from 'src/entities/User'
import { Response as CustomResponse, HTTP } from 'src/frameworks/common/response'
import type { iUseCase } from 'src/frameworks/repositories/contracts'
import usersRepo from 'src/frameworks/repositories/inMemory/users.repo'
import { GetUserById } from 'src/useCases/users/getUserById.useCase'

export class GetUserByIdController {
	private readonly useCase: iUseCase<string, user | undefined>

	constructor(useCase: iUseCase<string, user | undefined>) {
		this.useCase = useCase
	}

	public controller() {
		return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
			try {
				if (req.params === undefined) {
					throw new Error('No params on the request on the get user by id controller.')
				}

				// http://domain/api/v1/users/:id --> need that id param
				const { id } = req.params as iGetUserByIdParams

				if (id === undefined) {
					throw new Error('No id on the request on the get user by id controller.')
				}

				const result = await this.useCase.execute(id)

				const response = new CustomResponse({ status: HTTP.OK, content: result })
				res.json(response)
				next()
			} catch (e) {
				next(e)
			}
		}
	}
}

interface iGetUserByIdParams {
	id?: string
}

export const getuserByIdController = new GetUserByIdController(new GetUserById(usersRepo))
