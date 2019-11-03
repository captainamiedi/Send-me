
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    email: DataTypes.STRING,
    last_name: DataTypes.STRING,
    addres: DataTypes.STRING,
    phone_no: DataTypes.INTEGER,
    password: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
