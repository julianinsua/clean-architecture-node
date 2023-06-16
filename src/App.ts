import express, { type Express } from 'express'

class App {
	private readonly app: Express
	private readonly port: number

	public constructor() {
		this.app = express()
		this.port = parseInt(process.env.PORT || '8080', 10)
	}

	public start(): void {
		this.app.listen(this.port)
		console.log(`Server running on port: ${this.port}`)
	}
}

export default App
