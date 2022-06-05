const Joi = require('joi');

module.exports = async ({ sql, params: _params }) => {
  const params = await Joi.object({
    user_no: Joi
      .number()
      .integer()
      .positive()
      .required(),
    rv_positive: Joi
      .number()
      .valid(1, 0)
      .required(),
    rv_content: Joi
      .string()
      .max(10000)
      .required(),
    rv_user_no: Joi
      .number()
      .integer()
      .positive()
      .invalid(Joi.in('user_no'))
      .required(),
  }).validateAsync(_params);

  const query = await sql`
  INSERT INTO review (
    user_no
    , rv_positive
    , rv_content
    , rv_user_no
  ) VALUES (
    ${params.user_no}
    , ${params.rv_positive}
    , ${params.rv_content}
    , ${params.rv_user_no}
  ) RETURNING rv_no
  `;

  return {
    state: 1,
    query,
  };
};
