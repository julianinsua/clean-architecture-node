import { v4 } from 'uuid'

export class User {
	private readonly id: string
	private lastName: string
	private firstName: string
	private gender?: genders
	private email: string
	private meta?: Record<string, unknown>

	constructor({
		id,
		firstName = '',
		lastName = '',
		gender = genders.NOT_SPECIFIED,
		email,
		meta = undefined,
	}: user) {
		this.id = id ?? v4()
		this.firstName = firstName
		this.lastName = lastName
		this.gender = gender
		this.email = email
		this.meta = meta
	}

	public get fullName(): string {
		if (this.firstName !== '' && this.lastName !== '') {
			return `${this.firstName} ${this.lastName}`
		}
		if (this.firstName !== '') {
			return this.firstName
		}
		if (this.lastName !== '') {
			return this.lastName
		}
		return ''
	}

	public getId(): string | undefined {
		return this.id
	}

	public getFirstName(): string | undefined {
		return this.firstName
	}

	public getLastName(): string | undefined {
		return this.lastName
	}

	public getGender(): genders | undefined {
		return this.gender
	}

	public getEmail(): string {
		return this.email
	}

	public getMeta(): Record<string, unknown> | undefined {
		return this.meta
	}

	public setFirstName(firstName: string | undefined): void {
		this.firstName = firstName ?? ''
	}

	public setLastName(lastName: string | undefined): void {
		this.lastName = lastName ?? ''
	}

	public setGender(gender: genders | undefined): void {
		this.gender = gender
	}

	public setEmail(email: string): void {
		this.email = email
	}

	public setMeta(meta: Record<string, unknown> | undefined): void {
		this.meta = meta
	}
}

export enum genders {
	NOT_SPECIFIED = 'NOT_SPECIFIED',
	MALE = 'MALE',
	FEMALE = 'FEMALE',
}

export interface user {
	id: string
	firstName?: string
	lastName?: string
	gender?: genders
	email: string
	meta?: Record<string, unknown>
}
