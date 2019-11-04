
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('orders', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    description: {
      type: Sequelize.TEXT,
    },
    destination: {
      type: Sequelize.TEXT,
    },
    departure: {
      type: Sequelize.TEXT,
    },
    weight: {
      type: Sequelize.INTEGER,
    },
    tracking_no: {
      type: Sequelize.TEXT,
    },
    payment_amount: {
      type: Sequelize.INTEGER,
    },
    service_fee: {
      type: Sequelize.INTEGER,
    },
    order_status: {
      type: Sequelize.TEXT,
      values: ['pending', 'accepted', 'rejected'],
      defaultValue: 'pending',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('orders'),
};
