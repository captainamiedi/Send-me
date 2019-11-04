
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('logistics', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.TEXT,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    orders_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    subscribe: {
      type: Sequelize.TEXT,
      values: ['free', 'partial', 'full'],
      defaultValue: 'free',
    },
    name: {
      type: Sequelize.TEXT,
    },
    isSubscribe: {
      type: Sequelize.BOOLEAN,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('logistics'),
};
