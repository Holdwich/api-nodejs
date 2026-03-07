import express from 'express';
import { createOrder, getOrderById, getOrders, deleteOrderById } from '../controllers/orderController.js';

const app = express();
const router = express.Router();

// declaração de rotas

router.post('/order', createOrder);

router.get('/order/list', getOrders);

router.get('/order/:id', getOrderById);

router.delete('/order/:id', deleteOrderById);

export default router;