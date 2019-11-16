/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-catch */
import { compareSync } from 'bcrypt';
import models from '../models';

const { users } = models;

export const signup = async (userObj) => {
  try {
    // console.log(userObj, 'servoice');
    // console.log(users, 'types');
    const userRes = await users.create(userObj);
    // console.log(userRes, 'auth.....');
    return userRes;
  } catch (err) {
    console.log(err, 'signup error');
    throw err;
  }
};

export const findUserById = async (id) => {
  try {
    return await users.findOne({
      where: { id },
    });
  } catch (err) {
    throw err;
  }
};

export const findUserByEmail = (email) => users.findOne({ where: { email } });

export const comparePassword = (password, hashedPassword) => compareSync(password, hashedPassword);

// export const login = async (userObj) => {
// }
