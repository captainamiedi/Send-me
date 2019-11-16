/* eslint-disable import/no-duplicates */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import jwtDecode from 'jwt-decode';
import ApiErrors from '../utils/ApiErrors';
// import sendVerificationEmail from '../utils/email';
import {
  comparePassword,
  findUserByEmail,
  logoutService,
  signup,
} from '../services/authService';
import passwordService from '../services/passwordService';
import { transporter, resetPasswordTemplate } from '../services/passwordService';
import {
  successResponseWithData,
  successResponse,
  errorResponse,
} from '../utils/response';
import { generateToken } from '../middlewares/tokenMiddleware';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

import models from '../models';

const {
  queryByEmail, queryById, updatePassword,
} = passwordService;

const jwtSecret = process.env.JWT_SECRET;
dotenv.config();

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
export const SendPasswordResetMail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await queryByEmail(email);
    if (!user) {
      throw new ApiErrors(message.userEmailNotFound(email), statusCode.notFound);
    }
    const token = jwt.sign({ user }, jwtSecret, { expiresIn: '1h' });
    const url = `http://localhost:3000/password/reset/${user.id}/${token}`;
    const emailTemplate = resetPasswordTemplate(user, url);
    transporter(emailTemplate, res);
  } catch (error) {
    errorResponse(res, error.statusCode || statusCode.serverError, error);
  }
};

export const receiveNewPassword = (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;

  queryById(userId)

    .then((user) => {
      const secret = `${user.password}-${user.createdAt}`;
      const payload = jwtDecode(token);
      if (payload.user.id === user.dataValues.id) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return;
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) return;
            updatePassword(hash, userId)
              .then(() => res.status(202).json('Password changed accepted'))
              .catch((err) => res.status(500).json(err));
          });
        });
      }
    })

    .catch(() => {
      res.status(404).json('Invalid user');
    });
};
