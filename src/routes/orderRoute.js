import { Router } from 'express';
import { orderController, itemApproveController } from '../controllers/orderController';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';
import { commentsController } from '../controllers/commentsController';


const route = Router();
route.post('/comment/:id', getToken, verifyToken, commentsController);
route.post('/order', getToken, verifyToken, orderController);
route.put('/approve/:id', getToken, verifyToken, itemApproveController);

export default route;
