import express, { json, type Express, urlencoded } from 'express'
import { ExpressRouter } from './frameworks/expressSpecific/routes'

class App {
	private readonly app: Express
	private readonly port: number

	public constructor() {
		this.app = express()
		this.port = parseInt(process.env.PORT ?? '8080', 10)
	}

	public start(): void {
		// Middlewares
		this.app.use(json())
		this.app.use(
			urlencoded({
				extended: true,
			})
		)

		// Routes
		// this is wrong need to figure it out
		this.app.use(process.env.API_PREFIX ?? '/api/v1/', ExpressRouter.initialize())

		// Common Error handling
		this.app.listen(this.port)
		console.log(`Server running on port: ${this.port}`)
	}
}

export default App
