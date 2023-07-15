import type { Request, Response as EResponse, NextFunction } from 'express'
import { Response, ResponseError } from '../common/response'

export const errorHandler = (err: any, req: Request, res: EResponse, _next: NextFunction): void => {
	const error = new ResponseError({
		status: err.status || 500,
		msg: err.msg || err.message || 'Internal error',
		reason: err.reason || err.stack || 'uncaught',
		url: req.originalUrl,
		ip: req.ip,
	})

	res
		.status(error.errorStatus)
		.json(new Response({ status: error.errorStatus, error: error.toObj() }))
}
