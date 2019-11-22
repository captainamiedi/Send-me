/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-catch */
import { compareSync } from 'bcrypt';
import models from '../models';

const { users } = models;

export const signup = async (userObj) => {
  try {
    const userRes = await users.create(userObj);
    return userRes;
  } catch (err) {
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
