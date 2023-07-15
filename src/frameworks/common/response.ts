export class Response {
	private readonly status: HTTP
	private readonly error: ResponseError | undefined
	private readonly content: any | undefined

	public constructor({ status = HTTP.OK, error, content }: iResponse) {
		if (error !== undefined) {
			this.error = new ResponseError(error)
		}
		this.status = status
		this.content = content
	}

	public get responseStatus(): HTTP {
		return this.status
	}

	public get responseError(): ResponseError | undefined {
		return this.error
	}

	public get responseContent(): any | undefined {
		return this.content
	}

	public toObj(): any {
		if (this.error !== undefined) {
			return this.error.toObj()
		}
		return {
			status: this.status,
			content: this.content,
		}
	}
}

export class ResponseError {
	private readonly status: HTTP
	private readonly msg: string
	private readonly reason: string
	private readonly url: string
	private readonly ip: string

	public constructor({ status = HTTP.OK, msg = '', reason = '', url = '', ip = '' }) {
		this.status = status
		this.msg = msg
		this.reason = reason
		this.url = url
		this.ip = ip
	}

	public get errorStatus(): HTTP {
		return this.status
	}

	public get errorMsg(): string {
		return this.msg
	}

	public get errorReason(): string {
		return this.reason
	}

	public get errorUrl(): string {
		return this.url
	}

	public get errorIp(): string {
		return this.ip
	}

	public toObj(): iResponseError {
		return {
			status: this.status,
			msg: this.msg,
			reason: this.reason,
			url: this.url,
			ip: this.ip,
		}
	}
}

interface iResponseError {
	status: HTTP
	msg: string
	reason: string
	url: string
	ip: string
}

interface iResponse {
	status: HTTP
	error?: iResponseError
	content?: any
}

export enum HTTP {
	OK = 200,
	NOT_FOUND = 404,
	BAD_REQUEST = 400,
}
