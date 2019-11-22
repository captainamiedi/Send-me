import models from '../models';

const { comments } = models;
// export default {
//     comment: async (commentObj) => {
//   try {
//     return await comments.create(commentObj);
//   } catch (error) {
//     throw error;
//   }
// };
// }
export const commentService = async (commentObj) => {
  try {
    return await comments.create(commentObj);
  } catch (error) {
    // console.log(error, 'errorrr');
    throw error;
  }
}
;