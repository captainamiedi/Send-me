import { order, approvedRequest } from '../services/orderService';

import { successResponseWithData, errorResponse, successResponse } from '../utils/response';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';

import models from '../models';

export const orderController = async (req, res) => {
  try {
    console.log(req.userData, 'auth');
    const user_id = req.userData.id;
    const {
      description, destination, departure, weight, payment_amount, service_fee, order_status,
    } = req.body;
    const orderObj = {
      user_id, description, destination, departure, payment_amount, service_fee, order_status, weight,
    };
    const orderResponse = await order(orderObj);
    console.log(orderResponse.dataValues, 'obj');
    const data = orderResponse.dataValues;
    successResponseWithData(res, statusCode.created, message.orderSuccess, data);
  } catch (error) {
    errorResponse(res, error.statusCode || statusCode.serverError, error);
  }
};

export const itemApproveController = async (req, res) => {
  try {
    const userId = req.params;
    const approveResponse = await approvedRequest(userId);
    // console.log(approveResponse, 'approve');
    successResponse(res, statusCode.success, message.approveSuccess)
  } catch (error) {
    console.log(error);
    errorResponse(res, error.statusCode || statusCode.serverError, error);
  }
}
;
