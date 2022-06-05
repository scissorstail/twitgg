const Joi = require('joi');

module.exports = async ({ sql, params: _params }) => {
  const params = await Joi.object({
    user_no: Joi
      .number()
      .integer()
      .positive()
      .required(),
    rv_no: Joi
      .number()
      .integer()
      .positive()
      .required(),
    rv_positive: Joi
      .number()
      .valid(1, 0),
    rv_content: Joi
      .string()
      .max(10000),
    state: Joi
      .number()
      .valid(0),
  }).validateAsync(_params);

  const query = await sql`
  UPDATE review SET
    rv_positive = COALESCE(${params.rv_positive}, rv_positive)
    , rv_content = COALESCE(${params.rv_content}, rv_content)
    , state = COALESCE(${params.state}, state)
    , updated_dt = now()
  WHERE
    rv_no = ${params.rv_no}
    AND user_no = ${params.user_no}
    AND state = 1
  RETURNING rv_no
  `;

  return {
    state: 1,
    query,
  };
};
