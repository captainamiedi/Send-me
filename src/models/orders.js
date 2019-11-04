
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    destination: DataTypes.TEXT,
    departure: DataTypes.TEXT,
    weight: DataTypes.INTEGER,
    tracking_no: DataTypes.TEXT,
    payment_amount: DataTypes.INTEGER,
    service_fee: DataTypes.INTEGER,
    order_status: DataTypes.TEXT,
  }, {});
  orders.associate = function (models) {
    // associations can be defined here
    orders.belongsTo(models.User, { foreignKey: 'user_id' });
  };
  return orders;
};
