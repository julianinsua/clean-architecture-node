import { v4 } from 'uuid'

export class Order {
	private readonly id: string
	private userId: string
	private productIds: string[]
	private isPayed?: boolean
	private date?: Date

	constructor({ id = v4(), userId, productIds, isPayed = false, date = new Date() }: iOrder) {
		this.id = id
		this.userId = userId
		this.productIds = [...productIds]
		this.isPayed = isPayed
		this.date = date
	}

	public toObj(): iOrder {
		return {
			id: this.id,
			userId: this.userId,
			productIds: [...this.productIds],
			isPayed: this.isPayed,
			date: this.date,
		}
	}

	public addProductId(productId: string): void {
		this.productIds.push(productId)
	}

	public get orderId(): string {
		return this.id
	}

	public get orderUserId(): string {
		return this.userId
	}

	public setUserId(userId: string): void {
		this.userId = userId
	}

	public get orderProducts(): string[] {
		return [...this.productIds]
	}

	public setProducts(products: string[]): void {
		this.productIds = products
	}

	public get orderDate(): Date | undefined {
		return this.date
	}

	public setOrderDate(date: Date): void {
		this.date = date
	}

	public setIsPayed(isPayed: boolean | undefined): void {
		this.isPayed = Boolean(isPayed)
	}
}

export interface iOrder {
	id: string
	userId: string
	productIds: string[]
	isPayed?: boolean
	date?: Date
}
