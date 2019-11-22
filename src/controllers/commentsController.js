import  { commentService }  from '../services/comments';
import { successResponseWithData, errorResponse, successResponse } from '../utils/response';
import message from '../utils/messageUtils';
import statusCode from '../utils/statusCode';
import models from '../models';

export const commentsController = async (req, res) => {
  try {
    const order_id = req.params.id;
    const user_id  = req.userData.id;
    const { comment } = req.body;
    const commentObj = { user_id, comment, order_id };
    const commentResponse = await commentService(commentObj);
    const data = commentResponse.dataValues;
    successResponseWithData(res, statusCode.created, message.commentSuccess, data)
  } catch (error) {
    errorResponse(res, error.statusCode || statusCode.serverError, error);
  }
};

