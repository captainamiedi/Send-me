
module.exports = (sequelize, DataTypes) => {
  const logistics = sequelize.define('logistics', {
    address: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    subscribe: DataTypes.STRING,
    name: DataTypes.TEXT,
    isSubscribe: DataTypes.BOOLEAN,
  }, {});
  logistics.associate = function (models) {
    // associations can be defined here
    logistics.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'users',
    });

    logistics.hasMany(models.orders, {
      foreignKey: 'order_id',
      as: 'order',
    });
  };
  return logistics;
};
