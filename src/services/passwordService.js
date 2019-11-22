import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import models from '../models';

sgMail.setApiKey(process.env.SENDGRID_API);

dotenv.config();


const { users } = models;


const queryByEmail = async (email) => {
  try {
    return await users.findOne({ where: { email } });
  } catch (err) {
    throw err;
  }
};

const queryById = async (id) => {
  try {
    return await users.findOne({ where: { id } });
  } catch (err) {
    throw err;
  }
};

const updatePassword = async (hash, id) => {
  try {
    return await users.update({ password: hash }, { where: { id } });
  } catch (err) {
    throw err;
  }
};

export const transporter = async (msg, res) => {
  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: 'Mail sent successfully' });
  } catch (err) {
    return res.status(500).json({ 'Error sending email': err });
  }
};

export const resetPasswordTemplate = (user, url) => {
  const from = 'captainamiedi1@gmail.com';
  const to = user.email;
  const subject = 'SendMe Password Reset';
  const html = `
    <p>Hey ${user.name || user.email},</p>
    <p>We heard that you lost your SendMe password. Sorry about that!</p>
    <p>But don’t worry! You can use the following link to reset your password:</p>
    <a href=${url}>${url}</a>
    <p>If you don’t use this link within 1 hour, it will expire.</p>
    <p>Send those package and track them now! </p>
    <p>–Your friends at SendMe</p>
    `;
  return {
    from, to, subject, html,
  };
};

export default {
  queryByEmail,
  queryById,
  updatePassword,
};
