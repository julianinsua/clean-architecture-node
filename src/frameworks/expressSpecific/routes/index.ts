/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import type { IRouter } from 'express'
import { addOrderController } from 'src/controllers/orders/addOrder.controller'
import { deleteOrderController } from 'src/controllers/orders/deleteOrder.controller'
import { getOrderByIdController } from 'src/controllers/orders/getOrderById.controller'
import { updateOrderController } from 'src/controllers/orders/updateOrder.controller'
import { addProductController } from 'src/controllers/products/addProduct.controller'
import { deleteProductController } from 'src/controllers/products/deleteProduct.controller'
import { getProductByIdController } from 'src/controllers/products/getProductById.controller'
import { updateProductController } from 'src/controllers/products/updateProduct.controller'
import { addUserController } from 'src/controllers/user/addUser.controller'
import { deleteUserController } from 'src/controllers/user/deleteUser.controller'
import { getuserByIdController } from 'src/controllers/user/getUserById.controller'
import { updateUserController } from 'src/controllers/user/updateUser.controller'
import { errorHandler } from 'src/frameworks/expressSpecific/errorHandler'

export class ExpressRouter {
	routes: IRouter

	public constructor() {
		this.routes = Router()
	}

	public static initialize(): IRouter {
		const router = Router()
		router
			.route('/users')
			.post(addUserController.controller())
			.put(updateUserController.controller())
		router
			.route('/users/:id')
			.get(getuserByIdController.controller())
			.delete(deleteUserController.controller())

		router
			.route('/products')
			.post(addProductController.controller())
			.put(updateProductController.controller())
		router
			.route('/products/:id')
			.get(getProductByIdController.controller())
			.delete(deleteProductController.controller())

		router
			.route('/orders')
			.post(addOrderController.controller())
			.put(updateOrderController.controller())
		router
			.route('/orders/:id')
			.get(getOrderByIdController.controller())
			.delete(deleteOrderController.controller())

			router.use(errorHandler)

		return router
	}
}
