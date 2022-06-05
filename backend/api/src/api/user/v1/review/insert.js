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

  const query0 = await sql`
  SELECT
    rv_no
  FROM review
  WHERE
    user_no = ${params.user_no}
    AND rv_user_no = ${params.rv_user_no}
    AND state = 1
  `;

  if (query0.length > 0) {
    const e = new Error('Review Already Exists');
    e.status = 422;
    e.data = {
      state: -1,
    };
    throw e;
  }

  const query1 = await sql`
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
    query: query1,
  };
};
