import type { iProduct } from 'src/entities/Product'
import { type user } from 'src/entities/User'

export interface iUserRepo {
	add: (user: user) => Promise<user>
	update: (user: user) => Promise<user | undefined>
	delete: (userId: string) => Promise<string | undefined>
	getById: (userId: string) => Promise<user | undefined>
}

export interface iProductRepo {
	add: (product: iProduct) => Promise<iProduct>
	update: (product: iProduct) => Promise<iProduct | undefined>
	delete: (productId: string) => Promise<string | undefined>
	getById: (productId: string) => Promise<iProduct | undefined>
}

export interface iRepo<T> {
	add?: (generic: T) => Promise<T>
	update?: (generic: Partial<T>) => Promise<T | undefined>
	delete?: (id: string) => Promise<string | undefined>
	getById?: (id: string) => Promise<T | undefined>
}

export interface iUseCase<T, U> {
	execute: (arg: Partial<T> | T) => Promise<U> | U
}
