import ApiErrors from '../utils/ApiErrors';
// import sendVerificationEmail from '../utils/email';

import {
  comparePassword,
  findUserByEmail,
  logoutService,
  signup,
} from '../services/authService';
import {
  successResponseWithData,
  successResponse,
  errorResponse,
} from '../utils/response';
import { generateToken } from '../middlewares/tokenMiddleware';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

import models from '../models';

// const { users } = models;

export default {
  signup: async (req, res) => {
    try {
      const {
        first_name, last_name, email, password, address, phone_no,
      } = req.body;
      // console.log(req.body, 'firstname');

      const userObj = {
        first_name,
        last_name,
        email,
        password,
        address,
        phone_no,
      };
      // console.log(userObj, 'obj');
      const user = await signup(userObj);
      // eslint-disable-next-line no-unused-vars
      // const emailVerify = await sendVerificationEmail(user.dataValues.email);
      const data = user.dataValues;
      // console.log(user, 'users');

      data.token = generateToken(data.id, email, data.role, first_name);
      delete data.password;
      successResponseWithData(
        res,
        statusCode.created,
        message.signupSuccess(req.email),
        data,
      );
    } catch (err) {
      console.log(err, 'contoller error');
      errorResponse(res, err.statusCode || statusCode.serverError, err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const validUser = await findUserByEmail(email);
      if (validUser === null || validUser === undefined) {
        throw new ApiErrors(
          message.userEmailNotFound(email),
          statusCode.notFound,
        );
      }
      const { password: hashedPassword, ...data } = validUser.dataValues;
      const validPassword = await comparePassword(password, hashedPassword);
      if (!validPassword) {
        throw new ApiErrors(message.incorrectPassword, statusCode.badRequest);
      } else {
        const token = generateToken(data.id, email, data.role, data.first_name);
        return successResponseWithData(
          res,
          statusCode.success,
          message.loginSuccess,
          { ...data, token },
        );
      }
    } catch (err) {
      errorResponse(res, err.statusCode || statusCode.serverError, err);
    }
  },
};
