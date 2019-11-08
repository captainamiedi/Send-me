import { hashSync, genSaltSync } from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const salt = genSaltSync(10);
  const users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_no: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.orders, {
      foreignKey: 'user_id',
      as: 'orders',
      onDelete: 'CASCADE',
    });
    users.hasMany(models.logistics, {
      foreignKey: 'user_id',
      as: 'logistics',
      onDelete: 'CASCADE',
    });
    users.beforeCreate((incomingUser) => {
      incomingUser.password = hashSync(incomingUser.password, salt);
    });
  };
  return users;
};
