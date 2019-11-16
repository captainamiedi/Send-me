import { Router } from 'express';

import authControllers from '../controllers/AuthController';
import { getToken, verifyToken } from '../middlewares/tokenMiddleware';
import authValidator from '../validation/authValiations';

const route = Router();

const {
  signup, login,
} = authControllers;
const { validateLogin, validateSignup, validateResult } = authValidator;

route.post('/auth/signup', signup);
route.post('/auth/login', validateLogin, validateResult, login);

export default route;
