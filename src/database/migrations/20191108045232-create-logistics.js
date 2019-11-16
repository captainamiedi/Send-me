
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('logistics', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    subscribe: {
      type: Sequelize.STRING,
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
