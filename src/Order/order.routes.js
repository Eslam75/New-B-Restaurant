import express from 'express';
import { createOrder, deleteAllOrders, deleteOrder, getAllOrders, getMyOrders, updatedOrder } from './Order.controller.js';
import { authMiddle } from '../../middleWare/middleWare.js';

const orderRouter=express.Router()

orderRouter.post("/addOrder",authMiddle,createOrder)
orderRouter.get("/Orders",getAllOrders)
orderRouter.get("/getMyOrders",authMiddle,getMyOrders)
orderRouter.delete("/deleteAllOrders",deleteAllOrders)
orderRouter.put("/updatedOrder/:orderId",updatedOrder)
orderRouter.delete("/deleteOrder/:id",deleteOrder)

export default orderRouter