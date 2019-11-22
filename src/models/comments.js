

module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    user_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    order_id: DataTypes.INTEGER,
  }, {});
  comments.associate = function (models) {
    // associations can be defined here
    comments.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'users',
      onDelete: 'CASCADE',
    });
    comments.belongsTo(models.orders, {
      foreignKey: 'order_id',
      as: 'orders',
      onDelete: 'CASCADE',
    });
  };
  return comments;
};
