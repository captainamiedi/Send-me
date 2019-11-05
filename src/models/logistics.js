
module.exports = (sequelize, DataTypes) => {
  const logistics = sequelize.define('logistics', {
    address: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    orders_id: DataTypes.INTEGER,
    subscribe: DataTypes.TEXT,
    name: DataTypes.TEXT,
    isSubscribe: DataTypes.BOOLEAN,
  }, {});
  logistics.associate = function (models) {
    // associations can be defined here
    logistics.belongsTo(models.User, { foreignKey: 'user_id' });
    logistics.belongsTo(models.orders, { foreignKey: 'orders_id' });
  };
  return logistics;
};
