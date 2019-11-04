
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
    User.belongsToMany(models.orders, { through: 'orders', foreignKey: 'userId' });
    User.belongsToMany(models.logistics, { through: 'logistics', foreignKey: 'userId' });
  };
  return User;
};
