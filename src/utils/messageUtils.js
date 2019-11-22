export default {
  approveSuccess: 'update successful',
  noEmail: 'email is required',
  invalidEmail: 'email is not valid',
  incorrectPassword: 'password is invalid',
  orderSuccess: 'order successfully completed',
  shortPassword: 'character must be 8',
  noDigitInPassword: 'password must contain numbrs',
  emptyFirstname: 'first name is required',
  emptyLastname: 'lastname is required',
  signupSuccess: (email) => `You have successfully registered with this email, ${email}.`,
  usedEmail: (email) => `User with this email (${email}) already exist.`,
  userEmailNotFound: (email) => `Sorry, there is no user with email ${email} in the database.`,
};
