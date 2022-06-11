const Joi = require('joi');

module.exports = async ({ sql, params: _params }) => {
  const params = await Joi.object({
    user_no: Joi
      .number()
      .integer()
      .positive()
      .required(),
  }).validateAsync(_params);

  // 회원탈퇴
  const query = await sql`
  DELETE FROM 
    users
  WHERE 
    user_no = ${params.user_no}
  `;

  return {
    state: 1,
    query,
  };
};
