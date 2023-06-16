import { v4 } from 'uuid'

export class Product {
	private readonly id: string
	private name: string
	private description: string
	private images?: string[]
	private price: number
	private color?: string
	private meta: Record<string, unknown>

	public constructor({
		id = v4(),
		name,
		description = '',
		images = [],
		price,
		color,
		meta = {},
	}: iProduct) {
		this.id = id
		this.name = name
		this.description = description
		this.images = images
		this.price = price
		this.color = color
		this.meta = meta
	}

	// GETTERS & SETTERS
	public get productId(): string {
		return this.id
	}

	public get productName(): string {
		return this.name
	}

	public setName(name: string | undefined = ''): void {
		this.name = name
	}

	public get productDescription(): string {
		return this.description
	}

	public setDescription(description: string | undefined = ''): void {
		this.description = description
	}

	public addImage(imageUrl: string | undefined): void {
		if (imageUrl === undefined || imageUrl.trim() === '') {
			return
		}
		this.images?.push(imageUrl)
	}

	public assignImages(imageList: string[] | undefined): void {
		if (imageList === undefined) {
			return
		}
		this.images = [...imageList]
	}

	public get productImages(): string[] | undefined {
		return this.images !== undefined ? [...this.images] : undefined
	}

	public get productPrice(): number {
		return this.price
	}

	public setPrice(price: number | undefined): void {
		if (price === undefined) {
			return
		}
		this.price = price
	}

	public get productColor(): string | undefined {
		return this.color
	}

	public setColor(color: string | undefined): void {
		if (color === undefined) {
			return
		}
		this.color = color
	}

	public get productMeta(): Record<string, unknown> {
		return this.meta
	}

	public setMeta(meta: Record<string, unknown> | undefined): void {
		if (meta === undefined || Object.keys(meta).length === 0) {
			return
		}
		this.meta = { ...meta }
	}
}

export interface iProduct {
	id?: string
	name: string
	description?: string
	images?: string[]
	price: number
	color?: string
	meta?: Record<string, unknown>
}
