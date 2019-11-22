import { Router } from 'express';
import { orderController, itemApproveController } from '../controllers/orderController';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';


const route = Router();

route.post('/order', getToken, verifyToken, orderController);
route.put('/approve/:id', getToken, verifyToken, itemApproveController);

export default route;
