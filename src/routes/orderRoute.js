import { Router } from 'express';
import { orderController } from '../controllers/orderController';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';


const route = Router();

route.post('/order', getToken, verifyToken, orderController);

export default route;
