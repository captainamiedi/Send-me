import { Router } from 'express';

import {SendPasswordResetMail,receiveNewPassword} from authControllers from '../controllers/AuthController';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';
import authValidator from '../validation/authValiations';



const route = Router();

const {
  signup, login,
} = authControllers;
const { validateLogin, validateSignup, validateResult } = authValidator;

route.post('/auth/signup', validateSignup, validateResult, signup);
route.post('/auth/login', validateLogin, validateResult, login);
route.post('/forgot', SendPasswordResetMail);
route.post('/receive_new_password/:userId/:token', receiveNewPassword);

export default route;
