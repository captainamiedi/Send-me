
import models from '../models';

const { orders } = models;

export const order = async (orderObj) => {
  try {
    // console.log(orderObj, 'seriveobj');
    const order = await orders.create(orderObj);
    // console.log(order, 'service');
    return order;
  } catch (error) {
    // console.log(error, 'service');
    throw error;
  }
};

export const approvedRequest = async (id) => {
  try {
    return await orders.update({ order_status: true }, { where:  id  });
  } catch (error) {
    throw error;
  }
};
