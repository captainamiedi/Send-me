
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    user_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    destination: DataTypes.TEXT,
    departure: DataTypes.TEXT,
    weight: DataTypes.STRING,
    payment_amount: DataTypes.INTEGER,
    service_fee: DataTypes.INTEGER,
    order_status: DataTypes.STRING,
  }, {});
  orders.associate = function (models) {
    // associations can be defined here
    orders.hasMany(models.logistics, {
      foreignKey: 'order_id',
      as: 'logistics',
      onDelete: 'CASCADE',
    });

    orders.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user',
      onDelete: 'CASCADE',
    });
  };
  return orders;
};
